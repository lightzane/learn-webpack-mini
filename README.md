# learn-webpack-mini

![](https://img.shields.io/badge/webpack-5.67.0-lightblue) ![](https://img.shields.io/badge/react-17.0.2-blue) ![](https://img.shields.io/badge/react--dom-17.0.2-lightblue)

Webpack using Typescript as entry point.

This project merely has LESS **Plugins** and **configurations** in `webpack.config.js` for quick mini demo of webpack

## Beginner

You must already have familiarized yourself first or finished the [Webpack Basics](https://github.com/lightzane/learn-webpack-mini) as this is a continuation/addition from that project.

### React Installation

```
npm i react react-dom
```

### Typescript React

```
npm i @types/react @types/react-dom -D
```

### Update Webpack Configuration

**webpack.config.ts**

```diff
const config: Configuration = {
-   entry: ['./src/main.ts', './src/style.scss'],
+   entry: ['./src/App.tsx', './src/style.scss'],

    ...

    resolve: {
-       extensions: ['.ts', '.js'],
+       extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
-               test: /\.ts$/,
+               test: /\.ts[x]?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            ...
        ]
    }

    ...
}
```

> `.tsx` and `.jsx` are the extensions used for React files for typescript and javascript, respectively.

### All together
**webpack.config.ts**
```ts
import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
    entry: ['./src/App.tsx', './src/style.scss'],
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
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
        static: ['./src'],
    },
};

export default config;
```

### Clean Up existing code
You may delete the following files if you came from the `main` branch of this repository
- Delete `src/main.ts` 
- Delete `src/index.html`

### Create HTML
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React | Webpack Mini Demo</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### Create Main Entry Point for React

**src/App.tsx**

```tsx
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>
                <p>Start editing to see some magic happen :)</p>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));
```

### Run your first React
```
npm start
```

### Create another React file

**src/Hello.tsx**
```tsx
import React from 'react';

export default ({ name }) => <h1>Hello {name}!</h1>;
```

### Update main entry point for React
```diff
 import React, { Component } from 'react';
 import { render } from 'react-dom'; 
+import Hello from './Hello';
 
+interface AppProps { }
+interface AppState {
+    name: string;
+}
 
-class App extends Component {
+class App extends Component<AppProps, AppState> {
+ 
+    constructor(props: AppProps) {
+        super(props);
+        this.state = {
+            name: 'React Typescript'
+        };
+    }
+ 
     render() {
         return (
             <div>
+                <Hello name={this.state.name}></Hello>
                 <p>Start editing to see some magic happen :)</p>
             </div>
         );
     }
 }
 
 render(<App />, document.getElementById('root'));
```

### Run your App

```
// Development
npm start

// Production
npm run build
```

## References
- https://www.taniarascia.com/getting-started-with-react/
- https://reactjs.org/docs/getting-started.html
