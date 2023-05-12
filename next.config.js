/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});
const withMDX = require("@next/mdx")();

module.exports = withPWA(withMDX(nextConfig));
