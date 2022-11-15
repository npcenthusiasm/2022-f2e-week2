import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// plugins
import Antd from 'ant-design-vue'
// Import our custom CSS
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
