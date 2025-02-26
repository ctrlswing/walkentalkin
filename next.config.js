/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/walkentalkin",
  assetPrefix: "/walkentalkin/",
};

module.exports = nextConfig;
