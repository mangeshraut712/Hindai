/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-progress",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-slider",
    ],
    scrollRestoration: true,
    optimizeCss: true,
    optimizeServerReact: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    // Enable turbo for faster builds
    turbo: {
      rules: [
        {
          test: /\.svg$/,
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      ],
    },
  },
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hindai.dev",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // Static optimization
  trailingSlash: false,
  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          framer: {
            name: "framer",
            chunks: "all",
            test: /[\\/]node_modules[\\/](framer-motion)/,
            priority: 20,
          },
          radix: {
            name: "radix",
            chunks: "all",
            test: /[\\/]node_modules[\\/](@radix-ui)/,
            priority: 15,
          },
          lucide: {
            name: "lucide",
            chunks: "all",
            test: /[\\/]node_modules[\\/](lucide-react)/,
            priority: 10,
          },
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2,
            priority: 5,
          },
        },
      };
    }
    return config;
  },
  // Security headers + performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
