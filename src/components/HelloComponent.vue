<template>
    <div>
        <p>Hello {{ name }}!</p>
        <p class="text-body-1">{{ message }}</p>

        <p style="max-width: 80vh">
            <v-text-field label="Message" filled rounded type="text" placeholder="message" v-model="message" />
        </p>

        <v-btn color="primary" elevation="2" @click="add()">Click Me</v-btn>
        <p v-if="sum">The sum of 5 + 10 is equal to {{ sum }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data: () => ({
        x: 5,
        y: 10,
        sum: 0,
    }),
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