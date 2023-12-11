import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AccessAccount from '@/pages/AccessAccount.vue'
import CreateAccount from '@/pages/SignUp.vue'
import RecoverAccount from '@/pages/RecoverAccount.vue'
import CheckDevice from '@/pages/CheckDevice.vue'
import CheckNetwork from '@/pages/CheckNetwork.vue'
import Dashboard from '@/pages/Dashboard.vue'
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/access-account',
      component: AccessAccount
    },
    {
      path: '/create-account',
      component: CreateAccount
    },
    {
      path: '/recover-account',
      component: RecoverAccount
    },
    {
      path: '/check-device',
      component: CheckDevice
    },
    {
      path: '/check-network',
      component: CheckNetwork
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
})
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
