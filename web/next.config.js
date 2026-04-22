/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Next/Turbopack treats this folder as the root,
    // even if other lockfiles exist higher up on disk.
    root: __dirname,
  },
};

module.exports = nextConfig;

