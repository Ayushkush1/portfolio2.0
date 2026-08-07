/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote patterns here if you load images from external domains
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ayushkushwaha.com',
          },
        ],
        destination: 'https://ayushkushwaha.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
