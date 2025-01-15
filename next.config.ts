import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // appDir: true, // Aktiverar stöd för app-mappen
    typedRoutes: true, // Om du använder TypeScript och dynamiska routes
  },
};

export default nextConfig;
