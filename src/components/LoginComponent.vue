<template>
    <div>
        <h1>(H1) Login Component</h1>
        <pre>{{ sampleText }}</pre>
        <form>
            <input type="text" v-model="username" />
            <input type="password" v-model="password" />
        </form>
        <pre v-if="username && password">
            {
                username: {{ username }},
                password: {{ password }}
            }
        </pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data: () => {
        return {
            sampleText: 'This text was inserted via Vue interpolation',
            username: '',
            password: '',
        };
    },
    computed: {
        print(): void {},
    },
});
</script>