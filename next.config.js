/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://mini-reto-delta.vercel.app/:path*",
      },
    ];
  },
};
