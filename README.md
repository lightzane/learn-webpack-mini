# learn-webpack-mini

![](https://img.shields.io/badge/webpack-5.67.0-lightblue)

Webpack using Typescript as entry point.

This project merely has LESS **Plugins** and **configurations** in `webpack.config.js` for quick mini demo of webpack

### Webpack Installation

```
npm i webpack webpack-cli webpack-dev-server -D
```

### Webpack Dependencies

```
npm i typescript ts-loader sass sass-loader css-loader style-loader -D
```

### Webpack Plugins

```
npm i html-webpack-plugin clean-webpack-plugin -D
```

**package.json**

```json
{
    "scripts": {
        "start": "webpack-dev-server",
        "build": "webpack"
    },
    "devDependencies": {
        "clean-webpack-plugin": "^4.0.0",
        "css-loader": "^6.5.1",
        "html-webpack-plugin": "^5.5.0",
        "sass": "^1.49.0",
        "sass-loader": "^12.4.0",
        "style-loader": "^3.3.1",
        "ts-loader": "^9.2.6",
        "typescript": "^4.5.5",
        "webpack": "^5.67.0",
        "webpack-cli": "^4.9.1",
        "webpack-dev-server": "^4.7.3"
    }
}
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
