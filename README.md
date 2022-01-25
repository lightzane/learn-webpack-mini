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

### Init Typescript

```
npx tsc --init
```

This will generate a `tsconfig.json` file in root directory

**webpack.config.js**

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // ...
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

### Webpack Configuration

> 1. Provide an `entry: [ ]` point. The **main** entry point should be a `ts` (or `js` file) and opt to add styles (i.e. css, scss)

```diff
const config: Configuration = {
+    entry: ['./src/main.ts', './src/style.scss'],
};
```

> 2. Provide `output: { }`, at least `"filename"` and `"path"` property is defined.

`filename` - (string) any output filename you want but it is recommended to include the variables `[name]` and `[contenthash]` that will auto-name the generated chunks and prevent conflict or duplicate filenames.

`path` - (string) an absolute path of a directory which to output the files/bundles

```diff
const config: Configuration = {

    ...

+    output: {
+        filename: '[name]-[contenthash].js',
+        path: path.resolve(__dirname, 'dist'),
+    },
};
```

> 3. Add `resolve: { }` with `"extensions"` (array) property and provide list to be resolved. This is needed if your files are using `require()` or `import()` between your `ts` or `js` files. Also, to prevent MODULE_NOTE_FOUND error.

```diff
const config: Configuration = {

    ...

+    resolve: {
+        extensions: ['.ts', '.js'],
+    },
};
```

> 4. Provide `module: { }` with `"rules"` (array) property to determine loaders to use for a specified file.

First define the loader for `.ts` files which is the `ts-loader`. The `test` accepts a `RegExp` pattern that tells Webpack to use this loader for `*ts` filename and `"exclude"` all files under node_modules.

```diff
const config: Configuration = {

    ...

+    module: {
+        rules: [
+            {
+                test: /\.ts$/,
+                use: 'ts-loader',
+                exclude: /node_modules/,
+            },
+        ],
+    },
}
```

> 5. Add a loader for your styles (specifically for `*.scss`/`*.sass` files).

In this case, it uses 3 loaders, thus, `"use"` is an array where loaders should be **strictly placed sequentially**.

The **first loader** to be used should be the **last index**.

Index-0: Extract CSS and inject `<style>` nodes in HTML (`MiniCssExtractPlugin.loader`)
Index-1: Compile CSS to CommonJS (`css-loader`)
Index-2: Compile SASS/SCSS to CSS (`sass-loader`)

```diff
const config: Configuration = {

    ...

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
+            {
+                test: /\.s[ac]ss$/,
+                use: [
+                    loader: MiniCssExtractPlugin.loader,
+                    'css-loader',
+                    'sass-loader',
+                ],
+            },
        ],
    },
}
```

> 6. Add `plugins: [ ]` to import all your webpack plugins.

```diff
const config: Configuration = {

    ...

+    plugins: [
+        new HtmlWebpackPlugin({
+            template: './src/index.html',
+        }),
+        new MiniCssExtractPlugin({
+            filename: '[name]-[contenthash].css',
+        }),
+        new CleanWebpackPlugin(),
+    ],
}
```

> 7. Optimization to enable webpack generate multiple chunks when a file exceeds its max file size limit.

```diff
const config: Configuration = {

    ...

+    optimization: {
+        splitChunks: {
+            chunks: 'all',
+        },
+    },
}
```

> 8. Provide `devServer` config to aid development.

`port` - (number) localhost:{port} will host your app

`static` - (string | array) - relative path of your **static** files so `webpack-dev-server` can watch the file, listen to changes and refresh the browser page accordingly. (default: `./public`)

```diff
const config: Configuration = {

    ...

+    devServer: {
+        port: 4200,
+        static: ['./src'],
+    },

}
```

### All together

```ts
import path from 'path';
import { Configuration } from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// ! to enable Reload of page when static files are changed
// * provide a static path config for webpack-dev-server! (see package.json)
// webpack-dev-server --static ./src/app,
// * or provide in devServer.static = []

const config: Configuration = {
    entry: ['./src/main.ts', './src/style.scss'],
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    // ! REQUIRED if main.ts imports from other files (to prevent MODULE_NOT_FOUND error)
    resolve: {
        extensions: ['.ts', '.js'],
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
                    loader: MiniCssExtractPlugin.loader,
                    // Translate CSS into CommonJS
                    'css-loader',
                    // Compiles Sass into CSS
                    'sass-loader',
                ],
            },
        ],
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
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        port: 4200,
        // ! to enable Reload of page when static files are changed
        static: ['./src'],
    },
};

export default config;
```

## Dependencies

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

## Level Up

Learn to add Vue in webpack from scratch

-   [Vue from Scratch](https://github.com/lightzane/learn-webpack-mini/tree/vue-from-scratch)
