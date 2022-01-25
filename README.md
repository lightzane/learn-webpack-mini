# learn-webpack-mini

![](https://img.shields.io/badge/webpack-5.67.0-lightblue) ![](https://img.shields.io/badge/vue-2.16.14-2ecc71) ![](https://img.shields.io/badge/vuetify-2.6.2-1867c0)

[Vue](https://v2.vuejs.org/) from scratch with Webpack using Typescript as entry point.

This project merely has LESS **Plugins** and **configurations** in `webpack.config.ts` for quick mini demo of webpack

# Beginner

You must already have familiarized yourself first or finished the [Webpack Basics](https://github.com/lightzane/learn-webpack-mini/tree/main) and [Vue from Scratch](https://github.com/lightzane/learn-webpack-mini/tree/vue-from-scratch) as this is a continuation/addition from that project.

## Vscode Extension

Install [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) in vscode. This will help edit .vue files as far as writing **Vuetify** snippets.

## Font Installation

**src/index.html**

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet" />
```

Update the style in `src/App.vue`

```diff
<style lang="scss">
-   * {
-      font-family: Arial;
-   }
+   html,
+   body {
+       height: 100%;
+   }
+   body {
+       margin: 0;
+       font-family: Roboto, 'Helvetica Neue', sans-serif;
+   }
</style>
```

## Vuetify Installation

[Vuetify](https://vuetifyjs.com/en/) is a Material Design Framework for [Vue](https://v2.vuejs.org/)

```
npm i vuetify@2
```

Create a plugin file for Vuetify, `src/plugins/vuetify.ts` with the below content:

**src/plugins/vuetify.ts**

```ts
import Vue from 'vue';
import Vuetify, { UserVuetifyPreset } from 'vuetify';

Vue.use(Vuetify);

const opts: UserVuetifyPreset = {};

export default new Vuetify(opts);
```

Update main entry point

**src/main.ts**

```diff
 import Vue from 'vue';
 import App from './App.vue';
 import router from './router';
+import vuetify from '@/plugins/vuetify' // path to vuetify export

 new Vue({
+    vuetify,
     router,
     render: h => h(App)
 }).$mount('#app');
```

### Import v-app and v-main components

> The `v-app` component is **REQUIRED** for all applications and should only be rendered within your application **ONCE**.<br>
> When using _vue-router_ it is recommended that you place your views inside `v-main`.

**src/plugins/vuetify.ts**

```diff
 import Vue from 'vue';
 import Vuetify, { UserVuetifyPreset } from 'vuetify';
+import { VApp, VMain } from 'vuetify/lib';

-Vue.use(Vuetify);
+Vue.use(Vuetify, {
+    components: {
+        VApp,
+        VMain
+    }
+});

 const opts: UserVuetifyPreset = {};

 export default new Vuetify(opts);
```

Update parent vue file `App.vue` and wrap content around `v-app` and `v-main`

**src/App.vue**

```diff
 <template>
-    <div>
+    <v-app>
+        <v-main>
            <h1>Vue Webpack from Scratch</h1>
            <HelloComponent name="John" message="You are awesome"></HelloComponent>
            <router-view></router-view>
            <router-link to="/" tag="a">Home</router-link>
            <router-link to="/about" tag="button">About</router-link>
+        </v-main>
+    </v-app>
-    </div>
 </template>

 ...

```

## Import other components

### Buttons

Import `v-btn` on your vuetify plugin

**src/plugins/vuetify.ts**

```diff
 import Vue from 'vue';
 import Vuetify, { UserVuetifyPreset } from 'vuetify';
-import { VApp, VMain } from 'vuetify/lib';
+import { VApp, VMain, VBtn } from 'vuetify/lib';

 Vue.use(Vuetify);
 Vue.use(Vuetify, {
     components: {
         VApp,
         VMain,
+        VBtn
     }
 });

 const opts: UserVuetifyPreset = {};

 export default new Vuetify(opts);
```

Implement on `HelloComponent.vue`

**src/components/HelloComponent.vue**

```diff
 <template>
     <div>
         <p>Hello {{ name }}!</p>
         <p>{{ message }}</p>

         <p><input type="text" v-model="message" /></p>

-        <button @click="add()">Click Me</button>
+        <v-btn color="primary" elevation="2" @click="add()">Click Me</v-btn>
         <p v-if="sum">The sum of 5 + 10 is equal to {{ sum }}</p>
     </div>
 </template>
```

### Provide your application the proper gutter

Import `v-container` in your plugin and apply in your file:

**src/plugins/vuetify.ts**

```diff
 import Vue from 'vue';
 import Vuetify, { UserVuetifyPreset } from 'vuetify';
-import { VApp, VMain, VBtn } from 'vuetify/lib';
+import { VApp, VMain, VContainer, VBtn } from 'vuetify/lib';

 Vue.use(Vuetify);
 Vue.use(Vuetify, {
     components: {
         VApp,
         VMain,
+        VContainer,
         VBtn
     }
 });

 const opts: UserVuetifyPreset = {};

 export default new Vuetify(opts);
```

**src/App.vue**

```diff
 <template>
     <v-app>
         <v-main>
+            <v-container>
                 <h1>Vue Webpack from Scratch</h1>
                 <HelloComponent name="John" message="You are awesome"></HelloComponent>
                 <router-view></router-view>
                 <router-link to="/" tag="a">Home</router-link>
                 <router-link to="/about" tag="button">About</router-link>
+            </v-container>
         </v-main>
     </v-app>
 </template>

 ...

```

## Congratulations

I now leave the rest to you in your imagination!

Explore more and play around here:

-   https://vuetifyjs.com/en/components/buttons/

## Keep in mind

> `v-list-tile`, `v-btn`, and `v-card` all **extend** `router-link`, so you can use any of the router-link _attributes_ directly on those components instead.

For example:

```diff
-    <router-link to="/" tag="a">Home</router-link>
-    <router-link to="/about" tag="button">About</router-link>
+    <v-btn color="primary" outlined rounded to="/">Home</v-btn>
+    <v-btn color="#2ecc71" raised rounded dark to="/about">About</v-btn>
```

## Default Application Markup

This is an example of the default application markup for Vuetify. You can place your layout elements anywhere, as long as you apply the app property. The key component to making your page content work together with layout elements is v-main. The v-main component will be dynamically sized depending upon the structure of your designated app components. You can use combinations of any or all of the above components including v-bottom-navigation.

Source: https://vuetifyjs.com/en/components/application/#default-application-markup

```vue
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
```

## Reference:

-   https://vuetifyjs.com/en/components/application/
