<template>
    <div>
        <h1>Hello Vue</h1>
        <HelloComponent
            name="Lightzane"
            message="Welcome to Vue from Scratch using Webpack and Typescript"
        />
        <AdditionComponent />
        <LoginComponent />
        <h1>Router View</h1>
        <router-link to="/" tag="button">Home</router-link>
        <router-link to="/about" tag="button">About</router-link>
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloComponent from '@/components/HelloComponent.vue';
import AdditionComponent from '@/components/AdditionComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';

export default Vue.extend({
    components: {
        HelloComponent,
        // or you can lazy load the component:
        // HelloComponent: () => import('@/components/HelloComponent.vue'),
        AdditionComponent,
        LoginComponent,
    },
});
</script>


<style lang="scss">
$heading-color: #2ecc71;

h1,
h2 {
    color: $heading-color;
}

p {
    font-family: Arial;
}
$margin: 20px;
$font: 'Arial';

*,
html,
body {
    margin: 0;
    padding: 0;
}

div {
    margin: $margin;
}

h1,
h2 {
    font-family: $font;
}

pre {
    font-size: 16px;
}

button {
    padding: calc($margin / 2);
}
</style>