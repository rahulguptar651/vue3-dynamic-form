import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// store
import { store } from "@/store"
// router
import router from './router'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app')
