import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be accessed from the LAN/VPN IP (e.g. browsing from
  // a laptop to the dev box) without Next.js cross-origin dev warnings.
  allowedDevOrigins: ["192.168.68.91"],
  async redirects() {
    return [
      // Bare /traction has no page of its own; land visitors on support.
      { source: "/traction", destination: "/traction/support", permanent: false },
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
