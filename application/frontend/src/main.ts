import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.component.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './router'

createApp(App)
  .use(createPinia())
  .use(createRouter({
    history: createWebHashHistory(),
    routes
  })).mount('#app')
