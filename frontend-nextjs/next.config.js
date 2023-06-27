const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // assetPrefix: 'https://static.annleefores.cloud',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.annleefores.cloud',
                port: '',
                pathname: '/avatars/**',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
                port: '',
            },

        ],
    },
}

module.exports = nextConfig
