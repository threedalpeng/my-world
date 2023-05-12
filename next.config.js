/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
});
const withMDX = require("@next/mdx")();

module.exports = withPWA(withMDX(nextConfig));
