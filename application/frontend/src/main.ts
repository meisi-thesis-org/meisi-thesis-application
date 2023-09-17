import { createApp } from 'vue'
import App from './app.component.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { SignUpComponent } from './pages/sign-up'
import { SignInComponent } from './pages/sign-in'

const routes = [
  { path: '/sign-up', component: SignUpComponent },
  { path: '/sign-in', component: SignInComponent },
  { path: '/', component: SignInComponent }
]

createApp(App).use(createRouter({
  history: createWebHashHistory(),
  routes
})).mount('#app')
