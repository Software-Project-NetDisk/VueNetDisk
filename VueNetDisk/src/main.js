import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'

const app = createApp(App)

// 引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);

// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 路由
import router from './router'
app.use(router);

// 路由守卫 
import "~/router/permission.js"

// pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
pinia.use(piniaPluginPersistedstate)
app.use(pinia);

app.mount('#app');