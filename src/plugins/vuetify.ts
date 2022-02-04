import Vue from 'vue';
import Vuetify, { UserVuetifyPreset } from 'vuetify';
import { VApp, VMain, VContainer, VBtn, VTextField, VAppBar, VAppBarTitle, /*VToolbar, VToolbarTitle, */ VAppBarNavIcon, VSpacer, VIcon, VNavigationDrawer, VList, VListItem, VListItemContent, VListItemTitle, VListItemSubtitle, VDivider, VListItemIcon, VCard, VCardTitle, VCardSubtitle, VCardText, VCardActions, VImg } from 'vuetify/lib';

Vue.use(Vuetify, {
    components: { // this also works: Vue.use(Vuetify, { VApp, VMain })
        VApp,
        VMain,
        VContainer,
        VBtn,
        VTextField,
        VAppBar,
        VAppBarTitle,
        // VToolbar,
        // VToolbarTitle,
        VAppBarNavIcon,
        VSpacer,
        VIcon,
        VNavigationDrawer,
        VList,
        VListItem,
        VListItemContent,
        VListItemTitle,
        VListItemSubtitle,
        VListItemIcon,
        VDivider,
        VCard,
        VCardTitle,
        VCardSubtitle,
        VCardText,
        VCardActions,
        VImg
    }
});

const opts: UserVuetifyPreset = {
    // theme: {
    //     themes: {
    //         light: {
    //             primary: '#1976D2',
    //             secondary: '#424242',
    //             accent: '#82B1FF',
    //             error: '#FF5252',
    //             info: '#2196F3',
    //             success: '#4CAF50',
    //             warning: '#FB8C00',
    //         },
    //         dark: {
    //             primary: '#2196F3',
    //             secondary: '#424242',
    //             accent: '#FF4081',
    //             error: '#FF5252',
    //             info: '#2196F3',
    //             success: '#4CAF50',
    //             warning: '#FB8C00',
    //         },
    //     },
    // }
};

export default new Vuetify(opts);