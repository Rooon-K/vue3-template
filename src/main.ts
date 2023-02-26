import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter } from 'vue-router'
import router from './routes'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
