// * https://v2.vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
<script src="./App.ts"></script>
<style src="./App.scss"></style>

<template>
    <div>
        <h1>Hello Vue</h1>
        <p>{{ test }}</p>
        <HelloComponent
            name="Lightzane"
            message="Welcome to Vue from Scratch using Webpack and Typescript"
        />
        <AdditionComponent />
        <LoginComponent />
        <h1>Router View</h1>
        <router-link to="/" tag="button">Home</router-link>
        <router-link to="/about" tag="button">About</router-link>
        <button @click="exampleClick()">Example</button>
        <router-view />
    </div>
</template>