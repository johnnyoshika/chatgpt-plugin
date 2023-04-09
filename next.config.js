/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async rewrites() {
    return [
      {
        source: '/openapi.json',
        destination: '/api/openapi.json',
      },
    ];
  },

  async headers() {
    return [
      {
        // Enable CORS everywhere - needed for ChatGPT to access /.well-known/ai-plugin.json and /openapi.yaml
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        // CORS with allowed headers and methods is needed in api routes for ChatGPT
        source: '/api/assessments/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, PUT, POST, DELETE',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
