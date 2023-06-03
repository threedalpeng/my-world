const pipe = (functions) => (value) =>
  functions.reduce(
    (currentValue, currentFunction) => currentFunction(currentValue),
    value
  );

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const withPlugin = pipe([withPWA]);

module.exports = withPlugin(nextConfig);
