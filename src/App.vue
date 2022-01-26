<template>
    <v-app>
        <!-- v-navigation-drawer -->
        <v-navigation-drawer app clipped v-model="drawer" :dark="bgTheme === 'none'" :src="bgNavigationDrawer">
            <!-- 
                "clipped": 
                    displays v-navigation-drawer below the v-app-bar 
                    (requires: "clipped-left" prop in v-app-bar ) 
            -->
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6"> Vue Webpack </v-list-item-title>
                    <v-list-item-subtitle>from scratch</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav>
                <v-list-item v-for="item in items" :key="item.title" link>
                    <!-- :key is shorthand for v-bind:key -->
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-container>
                <v-card elevation="0" shaped>
                    <v-card-text>
                        <p class="text-body-1">You can refresh the page to see a different background for this drawer</p>
                        <p class="text-caption">50% chance to switch between 2 available bg image</p>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-navigation-drawer>

        <!-- v-app-bar -->
        <v-app-bar app clipped-left dark prominent :src="bgToolbar" shrink-on-scroll>
            <!-- 
                "clipped-left"

                    displays v-app-bar on top of the v-navigation-drawer                 
                    (requires: "clipped" prop for v-navigation-drawer ) 
            -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title> Vue Webpack </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="toggleTheme()">
                <v-icon v-if="isDarkTheme">mdi-white-balance-sunny</v-icon>
                <v-icon v-else>mdi-weather-night</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- v-main -->
        <v-main>
            <!-- v-toolbar -->
            <!-- <v-toolbar dark prominent :src="bgToolbar">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title> Vue Webpack </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-white-balance-sunny</v-icon>
                </v-btn>
            </v-toolbar> -->
            <!-- v-container -->
            <v-container>
                <HelloComponent name="John" message="You are awesome"></HelloComponent>
                <router-view></router-view>
                <v-btn color="primary" outlined rounded to="/">Home</v-btn>
                <v-btn color="#2ecc71" raised rounded dark to="/about">About</v-btn>

                <v-container v-for="index in 10" :key="index" style="max-width: 80vh">
                    <v-card elevation="2">
                        <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://play-lh.googleusercontent.com/ZdNBH-p5_YSsRciPAsWpmR7JdNoCTsi6Ad5ygzuqj3PzOIyyMF6P_JlmpJVUVvbfkg"
                        >
                            <v-card-title> Title everything </v-card-title>
                        </v-img>
                        <v-card-subtitle> Subtitle anything </v-card-subtitle>
                        <v-card-text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos omnis ut repellat esse neque nulla, minima tempore, a
                            maxime, voluptates voluptate hic consequuntur? Porro dicta laudantium accusantium nisi minima quisquam?
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text> Learn More </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
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
                bgNavigationDrawer = 'https://wallpaperaccess.com/full/5017083.jpg';
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
</script>

<style lang="scss">
html,
body {
    height: 100%;
}
body {
    margin: 0;
    font-family: Roboto, 'Helvetica Neue', sans-serif;
}

// prevent zoom-in mobile when entering input fields
@media screen and (max-width: 767px) {
    input,
    textarea,
    select {
        font-size: 16px !important;
    }
}
</style>