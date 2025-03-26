import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: 'export',          // Configures Next.js for static export (Client-Side Rendering)
  reactStrictMode: process.env.NODE_ENV === 'development', // Enables strict mode only in development
  typescript: {
    ignoreBuildErrors: false, // Enforces TypeScript checks during builds
  },
  images: { unoptimized: true }, // Disables image optimization, required for static exports
  trailingSlash: false,      // Adds trailing slashes to URLs for consistent static export behavior
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-cdn.com' : '', // Optional CDN prefix (commented out)
};

export default nextConfig;