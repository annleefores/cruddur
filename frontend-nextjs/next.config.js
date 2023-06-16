/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.annleefores.cloud',
                port: '',
                pathname: '/avatars/**',
            },
        ],
    },
}

module.exports = nextConfig
