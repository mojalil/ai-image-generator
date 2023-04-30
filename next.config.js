/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'seeklogo.com', 'aiimagegeneratormo328ffc.blob.core.windows.net']
}
}

module.exports = nextConfig
