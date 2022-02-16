import Vue from 'vue';
import HelloComponent from '@/components/HelloComponent.vue';

export default Vue.extend({
    components: {
        HelloComponent,
    },
    data: () => {
        let bgTheme = Math.random() <= 0.5 ? 'sky' : 'none';
        let bgNavigationDrawer: string;
        let bgToolbar: string = 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg';

        switch (bgTheme) {
            case 'sky': {
                bgNavigationDrawer = 'https://as1.ftcdn.net/v2/jpg/02/70/92/68/1000_F_270926864_i2D8igkbTP5EF2Fl9tU8Kcopa8EcZvC7.jpg';
                break;
            }
            case 'none': {
                bgNavigationDrawer = 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg';
                break;
            }
        }

        return {
            drawer: null, // the "app" prop of v-navigation-drawer will determine initial value
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                { title: 'Photos', icon: 'mdi-image' },
                { title: 'About', icon: 'mdi-help-box' },
            ],
            bgToolbar,
            bgNavigationDrawer,
            bgTheme,
            darkTheme: false,
        };
    },
    methods: {
        toggleTheme(): void {
            this.darkTheme = !this.darkTheme;
            this.$vuetify.theme.dark = this.darkTheme;
        },
    },
    // * if you update the value from a property this.$data
    // * the value will only be updated in memory BUT not the in the display or interpolation
    // try interpolate the same {{ value }} from the data and observe it will not update
    // in order for that to update and react on value changes
    // ! use "computed"
    // updates also the interpolated values {{ isDarkTheme }}
    computed: {
        isDarkTheme(): boolean {
            return this.darkTheme;
        },
    },
});