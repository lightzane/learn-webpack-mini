# learn-webpack-mini

![](https://img.shields.io/badge/webpack-5.67.0-lightblue) ![](https://img.shields.io/badge/vue-2.16.14-2ecc71)

[Vue](https://v2.vuejs.org/) from scratch with Webpack using Typescript as entry point.

This project merely has LESS **Plugins** and **configurations** in `webpack.config.ts` for quick mini demo of webpack

# Beginner

You must already have familiarized yourself first or finished the [Webpack Basics](https://github.com/lightzane/learn-webpack-mini/tree/main) as this is a continuation/addition from that project.

### Vscode Extension

Install [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) in vscode. This will help edit `.vue` files.

It is recommended if you are new (or not) to [Vue](https://v2.vuejs.org/).

### Vue Installation

```
npm i vue@2 vue-router@2
```

### Webpack Dependencies for Vue

```
npm i vue-loader vue-template-compiler -D
```

### Modify Typescript Configuration

Modify _some_ properties in `tsconfig.json`

```diff
{
  "compilerOptions": {
    ...
    "target": "es5",
    "strict": false,
    "noImplicitThis": true,
    "sourceMap": true,
    ...
  }
}
```

### Create Declaration file

In root directory, create the following file

**index.d.ts**

```ts
// below are used to satisfy typescript compiler

declare module '*.vue'; // to fix compile errors when importing *.vue files
declare module '@/*'; // to fix compile errosr when importing path resolved from alias (see webpack.config.ts - resolve.alias)
```

**webpack.config.ts**

Update your webpack configurations

```diff
...
+import { VueLoaderPlugin } from 'vue-loader';

const config: Configuration = {
-   entry: ['./src/main.ts', './src/style.scss'],
+   entry: './src/main.ts',
    ...
    resolve: {
         extensions: ['.ts', '.js'],
+        alias: {
+            '@': path.resolve(__dirname, 'src'),
+        },
    },
    module: {
        rules: [
             {
                 test: /\.ts$/,
-                use: 'ts-loader',
+                loader: 'ts-loader',
                 exclude: /node_modules/,
+                options: {
+                    appendTsSuffixTo: [/\.vue$/],
+                },
             },
+            {
+                test: /\.vue$/,
+                use: 'vue-loader',
+            },
            ...
        ]
    },
    plugins: [
        ...
+        new VueLoaderPlugin() as any,
    ],
};
```

### All together

**webpack.config.ts**

```ts
import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderPlugin } from 'vue-loader';

const config: Configuration = {
    entry: './src/main.ts',
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
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
                    loader: MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        // ! add "as any" to this plugin in order to prevent TS compiler error:
        // Property 'apply' is missing in type 'VueLoaderPlugin' but required in type 'WebpackPluginInstance'
        new VueLoaderPlugin() as any,
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash].css',
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
    }
};

export default config;
```

#### Clean Up existing code

You may delete the following files if you came from the `main` branch of this repository.

-   Delete `src/main.ts`
-   Delete `src/index.html`
-   Delete `src/style.scss`

### Create HTML

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vue | Webpack Mini Demo</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```

### Create Main Entry Point for Vue

**src/main.ts**

```ts
import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: (h) => h(App),
}).$mount('#app');
```

### Create first Vue file

The [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) extension of vscode will help you create the Vue template with ease.

**src/App.vue**

```vue
<template>
    <div>
        <h1>Vue Webpack from Scratch</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss">
* {
    font-family: Arial;
}
</style>
```

### Try it Out

```
npm start
```

### Create Component

**src/components/HelloComponent.vue**

```vue
<template>
    <div>
        <p>Hello {{ name }}!</p>
        <p>{{ message }}</p>

        <p><input type="text" v-model="message" /></p>

        <button @click="add()">Click Me</button>
        <p v-if="sum">The sum of 5 + 10 is equal to {{ sum }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data: () => {
        return {
            x: 5,
            y: 10,
            sum: 0,
        };
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        message: String,
    },
    methods: {
        add(): void {
            this.sum = this.x + this.y;
        },
    },
});
</script>
```

Update `App.vue` to include the component in its view

**src/App.vue**

```diff
 <template>
     <div>
         <h1>Vue Webpack from Scratch</h1>
+        <HelloComponent
+            name="John"
+            message="This is Vuetiful!">
+        </HelloComponent>
     </div>
 </template>

 <script lang="ts">
 import Vue from 'vue';
+import HelloComponent from '@/components/HelloComponent.vue';
 export default Vue.extend({
+    components: {
+        HelloComponent,
+    },
 });
 </script>
...
```

### Create Router

**src/router.ts**

```ts
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [],
});
```

Update **src/main.ts**

```diff
 import Vue from 'vue';
 import App from './test.vue';
+import router from './router';

 new Vue({
+    router,
     render: h => h(App)
 }).$mount('#app');
```

### Create Views

Create `Home.vue` and `About.vue`

**src/views/Home.vue**

```vue
<template>
    <div>
        <h1>HOME</h1>
    </div>
</template>
```

**src/views/About.vue**

```vue
<template>
    <div>
        <h1>ABOUT</h1>
    </div>
</template>
```

Update **src/router.ts**

```diff
 import Vue from 'vue';
 import Router from 'vue-router';

 Vue.use(Router);

 export default new Router({
     routes: [
+        {
+            path: '/',
+            component: Home
+        },
+        {
+            path: '/about',
+            component: () => import('@/views/About.vue') // lazy-load
+        },
+        {
+            path: '*',
+            component: () => import('@/views/PageNotFound.vue')
+        }
     ]
 });
```

Update `App.vue` to render the views

**src/App.vue**

```diff
 <template>
     <div>
         <h1>Vue Webpack from Scratch</h1>
         <HelloComponent
             name="John"
             message="This is Vuetiful!">
         </HelloComponent>
+        <router-view></router-view>
+        <router-link to="/" tag="a">Home</router-link>
+        <router-link to="/about" tag="button">About</router-link>
     </div>
 </template>
...
```

| Dependency | Description                                                            |
| ---------: | :--------------------------------------------------------------------- |
| vue-loader | Compiles `.vue` files to JS or SCSS (requires `vue-template-compiler`) |

## Level Up

Learn how to add [Vuetify](https://vuetifyjs.com/en/) in Vue which was created in Webpack from scratch. Material Design framework.

-   [with Vuetify](https://github.com/lightzane/learn-webpack-mini/tree/with-vuetify)
