// STYLES TOOLS
import './assets/styles/typographies.css'
import './assets/styles/resets.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'


const pinia = createPinia()
const maso = createApp(App)

maso.use(pinia)
maso.mount('#app')
