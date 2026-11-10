import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/blog/*": ["./content/blog/**/*.md"],
  },
};

export default nextConfig;
