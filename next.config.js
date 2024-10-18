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
};
