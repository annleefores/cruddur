const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    assetPrefix: 'https://cdn.annleefores.cloud',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.annleefores.cloud',
                port: '',
                pathname: '/**',
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
