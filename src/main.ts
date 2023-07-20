import { createPinia } from 'pinia'
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import router from './router'
import appVue from "./App.vue"

const app = createApp(appVue)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.use(Antd)
app.mount('#app')