// TrAction (the real-estate activity-tracking app) — shared facts for the
// join and reset pages that still live on this site, and the product site
// they are moving to (realestate-app spec 0015, decision 0028).
//
// Phase 2a (2026-10-08): the privacy, support and delete-account pages moved
// to the product site; /traction/{privacy,support,delete-account} redirect
// there permanently (next.config.ts). Phase 2b moves join and reset too.
//
// The legal entity is currently "Rob Frew" (matches the App Store Connect
// copyright line). When the partnership entity exists, change `legalEntity`
// here AND the ASC copyright line together.
// Mirror of traction-site data/site.ts `domain`; change both on a domain move.
const siteUrl = "https://tractionforagents.com";

export const traction = {
  name: "TrAction",
  legalEntity: "Rob Frew",
  contactEmail: "traction@robfrew.com",
  // The TrAction product site. Redirect targets and the frame's nav links.
  siteUrl,
  privacyUrl: `${siteUrl}/privacy`,
  supportUrl: `${siteUrl}/support`,
  deleteAccountUrl: `${siteUrl}/delete-account`,
  joinPath: "/traction/join",
  // Self-service password reset (spec 0014). The recovery email links to
  // `${resetPath}/confirm`; that URL is written literally in the Supabase
  // recovery template, so change both together.
  resetPath: "/traction/reset",
  // URL scheme registered by the app (app.json `scheme`), for "Open TrAction".
  appScheme: "traction",
  // Unlisted App Store listing: reachable by this link only, not by search.
  appStoreUrl: "https://apps.apple.com/app/id6789017202",
} as const;
