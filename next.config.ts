import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase signed URLs
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
      // Cloudflare R2 public bucket
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
        pathname: "/store-images/**",
      },
      // Cloudflare R2 private signed URLs
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
        pathname: "/store-images/**",
      },
    ],
  },
  /* other config options */
};

export default withFlowbiteReact(nextConfig);
