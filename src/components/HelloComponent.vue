<template>
    <div>
        <h1>(H1) HelloComponent (has style scoped)</h1>
        <h2>(H2) Hello {{ name }}</h2>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        name: {
            type: String,
            required: true,
        },
        message: String,
    },
});
</script>

<style lang="scss" scoped>
h1 {
    color: lightskyblue;
}

div {
    border: 1px solid black;
    padding: 20px;
}
</style>
