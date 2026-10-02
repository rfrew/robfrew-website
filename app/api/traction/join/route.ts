import { NextResponse } from "next/server";
import { clientIp, ipThrottleKey, isRateLimited } from "@/lib/rate-limit";
import { getTractionAdmin, isTractionConfigured } from "@/lib/traction-admin";
import { traction } from "@/data/traction";

// Creates a TrAction account from the join page (realestate-app spec 0013,
// decision 0026). Requires two env vars, set for Production only on Vercel:
//   TRACTION_SUPABASE_URL         — the TrAction Supabase project URL
//   TRACTION_SUPABASE_SECRET_KEY  — a dedicated, revocable secret key
//
// The order of the three calls is load-bearing:
//   1. join_validate_code  — is the agency code live? (throttled per client)
//   2. admin.createUser    — only reached with a valid code, so "this email
//                            already has an account" is never told to someone
//                            who doesn't hold a code
//   3. join_complete       — puts the profile in the CODE'S tenant; the tenant
//                            never comes from the request
// If step 3 fails, the user created in step 2 is deleted so no account is
// left without a profile.
//
// Never log the password, the code or the email.

type Field = "fullName" | "email" | "code" | "password";

interface JoinBody {
  ok: boolean;
  error?: string;
  field?: Field;
  message: string;
  agencyName?: string;
  email?: string;
}

const PASSWORD_MIN = 8;
// bcrypt (Supabase Auth's hash) reads at most 72 bytes.
const PASSWORD_MAX_BYTES = 72;

function reply(status: number, body: JoinBody, headers?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function invalid(field: Field, message: string) {
  return reply(400, { ok: false, error: "invalid_input", field, message });
}

const rateLimited = () =>
  reply(
    429,
    {
      ok: false,
      error: "rate_limited",
      message: "Too many attempts. Try again in 15 minutes.",
    },
    { "Retry-After": "900" }
  );

const invalidCode = () =>
  reply(403, {
    ok: false,
    error: "invalid_code",
    field: "code",
    message:
      "That code isn't valid. Check with your office for the current code.",
  });

const serverError = () =>
  reply(500, {
    ok: false,
    error: "server_error",
    message: `Something went wrong and no account was created. Please try again, or email ${traction.contactEmail}.`,
  });

export async function POST(request: Request) {
  try {
    if (!isTractionConfigured) {
      console.error("TrAction join not configured: missing TRACTION_SUPABASE_* env vars");
      return reply(503, {
        ok: false,
        error: "not_configured",
        message: "Joining is temporarily unavailable.",
      });
    }

    // Flood guard only — generous because a whole office joins from one
    // address in the same few minutes. The per-client limit on WRONG codes
    // lives in the database.
    const client = ipThrottleKey(clientIp(request));
    if (isRateLimited(`traction-join:${client}`, 300, 60_000)) {
      return reply(
        429,
        {
          ok: false,
          error: "busy",
          message: "Lots of people are joining right now. Wait a minute and try again.",
        },
        { "Retry-After": "60" }
      );
    }

    const data: unknown = await request.json().catch(() => null);
    if (!data || typeof data !== "object") {
      return reply(400, {
        ok: false,
        error: "invalid_input",
        message: "Invalid request.",
      });
    }
    const raw = data as Record<string, unknown>;

    const fullName =
      typeof raw.fullName === "string" ? raw.fullName.trim().replace(/\s+/g, " ") : "";
    // Count characters the way Postgres does (code points, not UTF-16 units).
    const nameLength = [...fullName].length;
    if (nameLength < 2 || nameLength > 60) {
      return invalid("fullName", "Enter your full name (2 to 60 characters).");
    }

    const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return invalid("email", "Enter a valid email address.");
    }

    const code = typeof raw.code === "string" ? raw.code.trim() : "";
    if (code.length < 1 || code.length > 64) {
      return invalid("code", "Enter the agency code from your office.");
    }

    const password = typeof raw.password === "string" ? raw.password : "";
    if (password.length < PASSWORD_MIN) {
      return invalid("password", `Use at least ${PASSWORD_MIN} characters.`);
    }
    if (Buffer.byteLength(password, "utf8") > PASSWORD_MAX_BYTES) {
      return invalid("password", "That password is too long. Use a shorter one.");
    }

    const admin = getTractionAdmin();

    // 1. Code check (records the attempt; throws once this client is throttled).
    const { data: codeOk, error: codeError } = await admin.rpc("join_validate_code", {
      p_code: code,
      p_client: client,
    });
    if (codeError) {
      if (codeError.message.includes("rate_limited")) return rateLimited();
      console.error("TrAction join: code check failed:", codeError.code);
      return serverError();
    }
    if (codeOk !== true) return invalidCode();

    // 2. Create the auth user. Never updates an existing one. email_confirm
    // skips the confirmation email (there is no email verification yet).
    const createUser = () =>
      admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        app_metadata: { source: "join-page" },
      });
    let { data: created, error: createError } = await createUser();
    // Two submissions of the same email at once (a double tap, two tabs): the
    // loser fails inside Supabase Auth with an unexpected error rather than
    // "email exists". Asking once more gives the true answer — "already
    // exists" if the other request won, or a clean create if it was a blip.
    if (createError && (createError.code === "unexpected_failure" || !createError.code)) {
      ({ data: created, error: createError } = await createUser());
    }
    if (createError || !created.user) {
      const errorCode = createError?.code;
      if (errorCode === "email_exists" || errorCode === "user_already_exists") {
        return reply(409, {
          ok: false,
          error: "account_exists",
          field: "email",
          message: `An account with this email already exists. Open TrAction and sign in. Forgot your password? Email ${traction.contactEmail}.`,
        });
      }
      if (errorCode === "weak_password") {
        return invalid("password", "That password is too easy to guess. Choose a different one.");
      }
      if (errorCode === "email_address_invalid" || errorCode === "validation_failed") {
        return invalid("email", "Enter a valid email address.");
      }
      // Without an error code the outcome is unknown (timeout / dropped
      // response): the user may exist with no profile. See the orphan cleanup
      // in realestate-app docs/runbooks/join-codes.md.
      console.error(
        errorCode
          ? `TrAction join: createUser failed: ${errorCode}`
          : `TrAction join: createUser outcome unknown (status ${createError?.status ?? "none"}) — check for an orphan`
      );
      return serverError();
    }
    const userId = created.user.id;

    // 3. Profile in the code's tenant; undo step 2 if it fails.
    const { data: joined, error: joinError } = await admin.rpc("join_complete", {
      p_user_id: userId,
      p_code: code,
      p_full_name: fullName,
    });
    if (joinError) {
      const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
      if (deleteError) {
        // Needs the orphan cleanup in realestate-app docs/runbooks/join-codes.md.
        console.error(`TrAction join: ORPHAN ${userId} (profile failed, delete failed)`);
        return serverError();
      }
      // The code was rotated, closed or used up between steps 1 and 3.
      if (joinError.message.includes("invalid_code")) return invalidCode();
      console.error("TrAction join: join_complete failed:", joinError.code);
      return serverError();
    }

    const result = (joined ?? {}) as { tenant_id?: string; agency_name?: string };
    console.log(`TrAction join: created ${userId} in tenant ${result.tenant_id}`);
    return reply(201, {
      ok: true,
      message: "Account created.",
      agencyName: result.agency_name,
      email,
    });
  } catch (error) {
    console.error(
      "TrAction join error:",
      error instanceof Error ? error.name : "unknown"
    );
    return serverError();
  }
}
