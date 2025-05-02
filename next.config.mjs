import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */

// Convert `import.meta.url` to a directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "app"),
    };
    return config;
  },
};

export default nextConfig;