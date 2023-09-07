/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "http2.mlstatic.com",
          port: "",
          pathname: "/",
        },
      ],
    },
  },
};

module.exports = nextConfig;
