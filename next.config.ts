import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";


const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
  /* config options here */
 
};

export default withFlowbiteReact(nextConfig);