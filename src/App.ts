import Vue from 'vue';
import HelloComponent from '@/components/HelloComponent.vue';
import AdditionComponent from '@/components/AdditionComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';

export default Vue.extend({
    data: () => ({
        test: 'Data coming from App.ts'
    }),
    components: {
        HelloComponent,
        // or you can lazy load the component:
        // HelloComponent: () => import('@/components/HelloComponent.vue'),
        AdditionComponent,
        LoginComponent,
    },
    methods: {
        exampleClick(): void {
            alert('Button is working fine!');
        }
    }
});