/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.jsonc$/,
      use: [
        {
          loader: 'jsonc-loader',
        },
      ],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.jsonc': {
        loaders: ['jsonc-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
