import path from 'path';
import { Configuration } from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderPlugin } from 'vue-loader';

// ! to enable Reload of page when static files are changed
// * provide a static path config for webpack-dev-server! (see package.json)
// webpack-dev-server --static ./src/app,
// * or provide in devServer.static = []

const config: Configuration = {
    // ? The following 3 commented-lines are explicitly included in package.json scripts
    // devtool: 'eval-source-map', // DEBUGGING for development -- also enable sourceMap: true in tsconfig.json
    // devtool: 'source-map', // DEBUGGING for production  -- also enable sourceMap: true in tsconfig.json
    // mode: 'production', // 'development' | 'production'
    entry: './src/main.ts',
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, 'docs')
    },
    // ! REQUIRED if main.ts imports from other files (to prevent MODULE_NOT_FOUND error)
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'), // must also declare in index.d.ts
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // Extracts CSS and Creates `style` nodes from JS strings
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: { publicPath: '../' } // Specifies a custom public path for the external resources like images, files, etc inside CSS
                    },
                    // Translate CSS into CommonJS
                    'css-loader',
                    // Compiles Sass into CSS
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        // ! add "as any" to this plugin in order to prevent TS compiler error:
        // Property 'apply' is missing in type 'VueLoaderPlugin' but required in type 'WebpackPluginInstance'
        new VueLoaderPlugin() as any,
        // to output a new index.html with injected dependencies (i.e. <scripts>)
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash].css',
            // chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        port: 4200,
        // ! to enable Reload of page when static files are changed
        static: ['./src'],
    }
};

export default config;