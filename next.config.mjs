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
      // Retired URLs from the old portfolio, kept alive for existing links and Google's index
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/work/:id(\\d+)', destination: '/work', permanent: true },
    ];
  },
};

export default nextConfig;
