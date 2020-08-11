const path = require('path')
const jsonImporter = require('node-sass-json-importer')

module.exports = {
    entry: './src/main.tsx',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.styl$/i,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                            },
                        },
                    },
                    { loader: 'stylus-loader' },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
