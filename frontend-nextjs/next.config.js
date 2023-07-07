const { hostname } = require('os')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    assetPrefix: isProd ? 'https://cdn.annleefores.cloud' : undefined,
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
