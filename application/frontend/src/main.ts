import { createApp } from 'vue'
import App from './app.component.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { SignUpComponent } from './pages/sign-up'

const routes = [
  { path: '/', component: SignUpComponent }
]

createApp(App)
  .use(createRouter({
    history: createWebHashHistory(),
    routes
  }))
  .mount('#app')
