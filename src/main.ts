import { loadConfig } from '@/stores/storage';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import jaJP from './locales/ja-JP.json'
import 'tdesign-mobile-vue/es/style/index.css';
import App from './App.vue';
import router from './router';

type MessageSchema = typeof zhCN

let lang = navigator.language;
lang = lang.substring(0,2);

const i18n = createI18n<[MessageSchema], 'zhCN' | 'enUS' | 'jaJP'>({
    locale: ((lang == 'zh'? 'zhCN':( lang == 'ja'? 'jaJP' : (lang == 'en'? 'enUS' : 'zhCN')))),
    fallbackLocale: 'zhCN',
    messages:{
        'zhCN': zhCN,
        'enUS': enUS,
        'jaJP': jaJP
    },
    legacy: false
})

const app = createApp(App)

app.use(createPinia())
loadConfig(i18n.global.locale)

app.use(i18n)
app.use(router)

app.mount('#app')
