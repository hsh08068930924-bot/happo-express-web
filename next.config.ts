import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGitHubPages ? '/happo-express-web' : '',
  assetPrefix: isGitHubPages ? '/happo-express-web/' : '',
};

export default nextConfig;
