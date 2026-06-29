import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'iconify-icon'
import '../tailwind.css'

const app = createApp(App)
//app.config.compilerOptions.isCustomElement = (tag) => tag.includes('iconify-icon')
app.use(router)
app.use(ElementPlus)
app.mount('#app')