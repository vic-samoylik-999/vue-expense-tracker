import { createApp } from 'vue'
import App from './App.vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './assets/style.css'

const app = createApp(App)

app.use(Toast)
    .mount('#app')
