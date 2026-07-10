import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be accessed from the LAN/VPN IP (e.g. browsing from
  // a laptop to the dev box) without Next.js cross-origin dev warnings.
  allowedDevOrigins: ["192.168.68.91"],
};

export default nextConfig;
