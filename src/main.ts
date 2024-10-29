import { loadConfig } from '@/stores/storage';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import 'tdesign-mobile-vue/es/style/index.css';
import App from './App.vue';
import router from './router';


const app = createApp(App)

app.use(createPinia())
loadConfig()

app.use(router)

app.mount('#app')
