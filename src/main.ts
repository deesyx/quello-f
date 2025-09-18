import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from "element-plus";
import PrimeVue from 'primevue/config';
import '@/styles/prime-paginator.scss'
import App from '@/App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(PrimeVue, {
    theme: {
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark'
        }
    }
});
app.mount("#app");
