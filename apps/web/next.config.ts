import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@stellix/ui-web', '@stellix/ui-core', '@stellix/ui-tokens'],
};

export default nextConfig;
