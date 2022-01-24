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
npm i ts-loader sass-loader css-loader style-loader -D
```

### Webpack Plugins

```
npm i html-webpack-plugin clean-webpack-plugin -D
```

### Other Dependencies

```
npm i typescript sass -D
```

**package.json**

```json
{
    "scripts": {
        "start:dev": "webpack-dev-server --mode=development --devtool=eval-source-map",
        "build": "webpack --mode=production"
    }
}
```

**webpack.config.json**

```typescript
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                    // Creates `style` nodes from JS strings
                    'style-loader',
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
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 4200,
        // ! to enable Reload of page when static files are changed
        static: ['./src'],
    },
};
```

|           Dependency | Description                                                                                      |
| -------------------: | :----------------------------------------------------------------------------------------------- |
|           typescript | Core dependency when writing `.ts` files                                                         |
|            ts-loader | Compiles `.ts` files to `.js`                                                                    |
|                 sass | Core dependency when writing `.scss` or `.sass` files                                            |
|          sass-loader | Compiles `.scss` or `.sass` to `CSS`                                                             |
|           css-loader | Compiles `CSS` to CommonJS                                                                       |
|         style-loader | Injects `<style>` nodes to the HTML template                                                     |
|  html-webpack-plugin | Generates the given HTML template and injects the `entry` point specified in `webpack.config.js` |
| clean-webpack-plugin | Cleans the `output` directory specified in `webpack.config.js`                                   |
