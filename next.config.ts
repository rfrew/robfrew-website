import type { NextConfig } from "next";
import { traction } from "./data/traction";

const nextConfig: NextConfig = {
  // Allow the dev server to be accessed from the LAN/VPN IP (e.g. browsing from
  // a laptop to the dev box) without Next.js cross-origin dev warnings.
  allowedDevOrigins: ["192.168.68.91"],
  async redirects() {
    // TrAction moved to its own site (realestate-app spec 0015, decision 0028).
    // These redirects are PERMANENT and must NEVER be removed: the App Store
    // and Google Play listings, Play Data safety, and emails already sent all
    // point at the old URLs. 308 keeps the path, the full query string and
    // (in the browser) the URL fragment, in one hop for the published URLs
    // (no trailing slash; Next's own slash-stripping adds a hop otherwise).
    // Phase 2b will widen this
    // to /traction/:path* and /api/traction/:path* once join and reset move.
    return [
      { source: "/traction", destination: `${traction.siteUrl}/support`, permanent: true },
      { source: "/traction/privacy", destination: traction.privacyUrl, permanent: true },
      { source: "/traction/support", destination: traction.supportUrl, permanent: true },
      { source: "/traction/delete-account", destination: traction.deleteAccountUrl, permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
