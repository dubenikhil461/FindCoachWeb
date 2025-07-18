import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { plugin, defaultConfig } from '@formkit/vue'
import router from './router/routes.js'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Quasar, {
  plugins: {}
})
app.use(plugin, defaultConfig)
app.use(router)
app.mount('#app')
