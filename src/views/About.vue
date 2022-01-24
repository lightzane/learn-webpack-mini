<template>
    <div>
        <h1>ABOUT</h1>
        <HelloComponent
            name="User Sample"
            message="The same Hello component with just different input properties"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloComponent from '@/components/HelloComponent.vue';
export default Vue.extend({
    components: { HelloComponent },
});
</script>