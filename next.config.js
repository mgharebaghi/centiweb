module.exports = {
  // ... other configurations ...
  async rewrites() {
    return [
      {
        source: '/dev/:slug*',
        destination: '/dev',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
};
