// next.config.ts
import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
};

export default withContentlayer(nextConfig);
