import type { NextConfig } from "next";

// The TrAction product site. Mirror of traction-site data/site.ts `domain`;
// change both on a domain move.
const TRACTION_SITE = "https://tractionforagents.com";

const nextConfig: NextConfig = {
  // Allow the dev server to be accessed from the LAN/VPN IP (e.g. browsing from
  // a laptop to the dev box) without Next.js cross-origin dev warnings.
  allowedDevOrigins: ["192.168.68.91"],
  async redirects() {
    // TrAction moved to its own site (realestate-app spec 0015, decision 0028).
    // These redirects are PERMANENT and must NEVER be removed: the App Store
    // and Google Play listings, Play Data safety, join links and QR codes
    // handed to offices, and password-reset emails already sent all point at
    // the old URLs. 308 keeps the method, the path, the full query string
    // (the reset token_hash rides there) and, in the browser, the URL
    // fragment (the join code rides there), in one hop for the published
    // URLs (no trailing slash; Next's own slash-stripping adds a hop
    // otherwise).
    return [
      { source: "/traction", destination: `${TRACTION_SITE}/support`, permanent: true },
      { source: "/traction/:path*", destination: `${TRACTION_SITE}/:path*`, permanent: true },
      { source: "/api/traction/:path*", destination: `${TRACTION_SITE}/api/:path*`, permanent: true },
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
