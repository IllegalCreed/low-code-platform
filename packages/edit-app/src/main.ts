import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:uno.css'
import '@/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import i18n from './locales'

const app = createApp(App)

/* NOTE: 所有use要在mount之前注册，这个之前确实没注意过 */
app.use(store)
app.use(router)
app.use(i18n)

app.mount('#app')

/**test ci */
