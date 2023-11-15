const path = require('path');

module.exports = {
    target: 'node',
    entry: './src/index.ts',
    output: {
        filename: 'deploy.js',
        path: path.resolve(__dirname, 'build'),
    },
    externals: {
        'node-pty': 'commonjs node-pty'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

        ],
    },


    resolve: {
        extensions: ['.tsx', '.ts', '.js'],

    },
    devtool: 'source-map',
};