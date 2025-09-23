import './assets/main.css'

import {createApp} from 'vue'
import ElementPlus from "element-plus";
import PrimeVue from 'primevue/config';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
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
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('Select', Select)
app.component('Button', Button)
app.mount("#app");
