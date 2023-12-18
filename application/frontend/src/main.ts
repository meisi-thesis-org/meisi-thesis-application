import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AccessAccount from '@/pages/AccessAccount.vue'
import CreateAccount from '@/pages/CreateAccount.vue'
import RecoverAccount from '@/pages/RecoverAccount.vue'
import CheckDevice from '@/pages/CheckDevice.vue'
import CheckNetwork from '@/pages/CheckNetwork.vue'
import Dashboard from '@/pages/Dashboard.vue'
import { createPinia } from 'pinia'
import { useAuthenticationResolver } from '@/resolvers/useAuthenticationResolver'
import { useDeviceResolver } from '@/resolvers/useDeviceResolver'
import { useNetworkResolver } from '@/resolvers/useNetworkResolver'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'access-account',
      path: '/access-account',
      component: AccessAccount,
      meta: {
        requiresSession: false
      }
    },
    {
      name: 'create-account',
      path: '/create-account',
      component: CreateAccount,
      meta: {
        requiresSession: false
      }
    },
    {
      name: 'recover-account',
      path: '/recover-account',
      component: RecoverAccount,
      meta: {
        requiresSession: false
      }
    },
    {
      name: 'check-device',
      path: '/check-device',
      component: CheckDevice,
      meta: {
        requiresSession: true
      },
      beforeEnter: useDeviceResolver
    },
    {
      name: 'check-network',
      path: '/check-network',
      component: CheckNetwork,
      meta: {
        requiresSession: true
      },
      beforeEnter: useNetworkResolver
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresSession: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => useAuthenticationResolver(to, from, next))
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
