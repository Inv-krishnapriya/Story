/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "files-sa.ip-poc.com",
      "files.interview-zero-dev.com",
      "ui-avatars.com",
    ],
  },
};

module.exports = nextConfig;
