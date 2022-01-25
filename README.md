# learn-webpack-mini

![](https://img.shields.io/badge/webpack-5.67.0-lightblue)

Webpack using Typescript as entry point.

This project merely has LESS **Plugins** and **configurations** in `webpack.config.js` for quick mini demo of webpack

### Webpack Installation

```
npm i webpack webpack-cli webpack-dev-server -D
```

### Webpack Loaders

```
npm i ts-loader sass-loader css-loader -D
```

### Webpack Plugins

```
npm i html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin -D
```

### Other Dependencies

```
npm i typescript sass -D
```

**package.json**

```json
{
    "scripts": {
        "start": "webpack-dev-server --mode=development --devtool=eval-source-map",
        "build": "webpack --mode=production"
    }
}
```

**webpack.config.json**

```typescript
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// ! to enable Reload of page when static files are changed
// * provide a static path config for webpack-dev-server! (see package.json)
// webpack-dev-server --static ./src/app,
// * or provide in devServer.static = []

module.exports = {
    // ? The following 3 commented-lines are explicitly included in package.json scripts
    // devtool: 'eval-source-map', // DEBUGGING for development -- also enable sourceMap: true in tsconfig.json
    // devtool: 'source-map', // DEBUGGING for production  -- also enable sourceMap: true in tsconfig.json
    // mode: 'production', // 'development' | 'production'
    entry: ['./src/main.ts', './src/style.scss'],
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // Extracts CSS and Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translate CSS into CommonJS
                    'css-loader',
                    // Compiles Sass into CSS
                    'sass-loader',
                ],
            },
        ],
    },
    // ! REQUIRED if main.ts imports from other files (to prevent MODULE_NOT_FOUND error)
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        // to output a new index.html with injected dependencies (i.e. <scripts>)
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 4200,
        // ! to enable Reload of page when static files are changed
        static: ['./src'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
```

### Changing to Typescript Webpack Config

The following package is needed as a runtime loader to help Webpack read/load webpack.config`.ts` file

```
npm i ts-node -D
```

**webpack.config.ts**

```ts
import path from 'path';
import { Configuration } from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
    // ...
};

export default config;
```

|              Dependency | Description                                                                                      |
| ----------------------: | :----------------------------------------------------------------------------------------------- |
|              typescript | Core dependency when writing `.ts` files                                                         |
|               ts-loader | Compiles `.ts` files to `.js`                                                                    |
|                    sass | Core dependency when writing `.scss` or `.sass` files                                            |
|             sass-loader | Compiles `.scss` or `.sass` to `CSS`                                                             |
|              css-loader | Compiles `CSS` to CommonJS                                                                       |
| mini-css-extract-plugin | Extracts `CSS` from CommonJS and injects `<style>` nodes to the HTML template                    |
|     html-webpack-plugin | Generates the given HTML template and injects the `entry` point specified in `webpack.config.js` |
|    clean-webpack-plugin | Cleans the `output` directory specified in `webpack.config.js`                                   |
