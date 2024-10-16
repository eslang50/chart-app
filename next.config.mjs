/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  
        port: '',        
        pathname: '/**', 
      },
      {
        protocol: 'http',
        hostname: '**', 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default config;
