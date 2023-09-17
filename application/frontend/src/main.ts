import { createApp } from 'vue'
import App from './app.component.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { SignUpComponent } from './pages/sign-up'
import { createHttpService } from './plugins/create-http-service.plugin'

const routes = [
  { path: '/', component: SignUpComponent }
]

createApp(App)
  .use(createHttpService)
  .use(createRouter({
    history: createWebHashHistory(),
    routes
  }))
  .mount('#app')
