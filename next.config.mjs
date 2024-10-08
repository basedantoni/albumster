/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" },
    ],
  },
};

export default nextConfig;
