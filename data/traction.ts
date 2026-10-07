// TrAction (the real-estate activity-tracking app) — shared facts for the
// public privacy-policy and support pages that both app stores link to, and
// the join page where agents create their account.
//
// The legal entity is currently "Rob Frew" (matches the App Store Connect
// copyright line). When the partnership entity exists, change `legalEntity`
// here AND the ASC copyright line together.
export const traction = {
  name: "TrAction",
  legalEntity: "Rob Frew",
  contactEmail: "traction@robfrew.com",
  // The date the policy was first published at this URL.
  effectiveDate: "September 2, 2026",
  effectiveDateISO: "2026-09-02",
  privacyPath: "/traction/privacy",
  supportPath: "/traction/support",
  joinPath: "/traction/join",
  // Self-service password reset (spec 0014). The recovery email links to
  // `${resetPath}/confirm`; that URL is written literally in the Supabase
  // recovery template, so change both together.
  resetPath: "/traction/reset",
  // URL scheme registered by the app (app.json `scheme`), for "Open TrAction".
  appScheme: "traction",
  // Account-deletion instructions (required by Google Play Data safety / Apple).
  deleteAccountPath: "/traction/delete-account",
  // Unlisted App Store listing: reachable by this link only, not by search.
  appStoreUrl: "https://apps.apple.com/app/id6789017202",
} as const;
