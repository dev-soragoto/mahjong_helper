import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadConfig } from '@/stores/storage';


import App from './App.vue'
import router from './router'
import 'tdesign-mobile-vue/es/style/index.css';


const app = createApp(App)

app.use(createPinia())
loadConfig()

app.use(router)

app.mount('#app')
