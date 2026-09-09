/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    VITE_IMAGE_SECRET_SALT:
      process.env.VITE_IMAGE_SECRET_SALT ||
      process.env.NEXT_PUBLIC_IMAGE_SECRET_SALT ||
      process.env.IMAGE_SECRET_SALT ||
      '',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
