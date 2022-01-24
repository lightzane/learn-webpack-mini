<template>
    <div>
        <h1>(H1) Addition Component</h1>
        <input type="text" v-model="x" />
        <input type="text" v-model="y" />
        <button @click="add()">Add</button>
        <pre>
            X: {{ x }}
            Y: {{ y }}
        </pre>
        <p v-if="sum">Sum: {{ sum }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data: () => {
        return { x: '', y: '', sum: undefined };
    },
    computed: {
        add(): void {
            this.sum = +this.x + +this.y;
        },
    },
});
</script>