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
        // Specify that we allow all headers in CORS requests (especially important in preflight OPTIONS request).
        // We don't need to specify Access-Control-Allow-Methods and Access-Control-Allow-Origin as they'll be specified automatically.
        source: '/api/todos/:username*',
        headers: [
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
