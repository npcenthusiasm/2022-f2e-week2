import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.scss'
import './assets/css/transition.scss'

// plugins
import Antd from 'ant-design-vue'
// Import our custom CSS
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
