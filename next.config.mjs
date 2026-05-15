/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  output: 'standalone',
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: "bucataria\\.md",
          },
        ],
        destination: "https://www.bucatariicroitoru.md/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: "www\\.bucataria\\.md",
          },
        ],
        destination: "https://www.bucatariicroitoru.md/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
