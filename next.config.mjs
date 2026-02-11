/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "gravatar.com",
      "purple-personal-impala-532.mypinata.cloud",
      "robohash.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: "purple-personal-impala-532.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
