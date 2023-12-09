import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AccessAccount from '@/pages/AccessAccount.vue'
import CreateAccount from '@/pages/CreateAccount.vue'
import RecoverAccount from '@/pages/RecoverAccount.vue'

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
    }
  ]
})

createApp(App).use(router).mount('#app')
