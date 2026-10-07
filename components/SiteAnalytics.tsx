"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Query parameters that must never reach analytics. The TrAction password
// reset link lands with a single-use recovery token in the query string
// (realestate-app decision 0027); the page strips it from the address bar
// after hydration, but the analytics script reports the first URL earlier
// than that, so it is scrubbed here too.
const SECRET_PARAMS = ["token_hash", "type"];

function scrub(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url);
    let changed = false;
    for (const name of SECRET_PARAMS) {
      if (url.searchParams.has(name)) {
        url.searchParams.delete(name);
        changed = true;
      }
    }
    return changed ? { ...event, url: url.toString() } : event;
  } catch {
    return event;
  }
}

export default function SiteAnalytics() {
  return <Analytics beforeSend={scrub} />;
}
