/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    NEXT_PRIVATE_API_URL: "http://localhost:3000"
  }
};

export default nextConfig;
