import { createApp } from 'vue'
import App from './app.component.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { SignUpComponent } from './pages/sign-up'
import { SignInComponent } from './pages/sign-in'
import { createPinia } from 'pinia'

const routes = [
  { path: '/sign-up', component: SignUpComponent },
  { path: '/sign-in', component: SignInComponent },
  { path: '/', component: SignInComponent }
]

createApp(App)
  .use(createRouter({
    history: createWebHistory(),
    routes
  }))
  .use(createPinia())
  .mount('#app')
