import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["darshan-karthikeya.localhost", "darshan-karthikeya.local"],
  devIndicators: false,
  experimental: {
    optimizePackageImports: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "@phosphor-icons/react",
      "@remixicon/react",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
    qualities: [75, 100],
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : undefined,
  async redirects() {
    return []
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:section(blog)/:slug.md",
          destination: "/doc.md/:slug",
        },
        {
          source: "/:section(blog)/:slug",
          destination: "/doc.md/:slug",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(?<accept>.*text/markdown.*)",
            },
          ],
        },
        {
          source: "/index.md",
          destination: "/llms.txt",
        },
        {
          source: "/",
          destination: "/llms.txt",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(?<accept>.*text/markdown.*)",
            },
          ],
        },
      ],
      afterFiles: [
        {
          source: "/rss",
          destination: "/blog/rss",
        },
      ],
    }
  },
}

export default nextConfig
