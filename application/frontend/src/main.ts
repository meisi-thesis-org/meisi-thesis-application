import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AccessAccount from '@/pages/AccessAccount.vue'
import CreateAccount from '@/pages/CreateAccount.vue'
import RecoverAccount from '@/pages/RecoverAccount.vue'
import CheckDevice from '@/pages/CheckDevice.vue'
import CheckNetwork from '@/pages/CheckNetwork.vue'
import Dashboard from '@/pages/Dashboard.vue'
import RegisterDevice from '@/pages/RegisterDevice.vue'
import RegisterNetwork from '@/pages/RegisterNetwork.vue'
import { createPinia } from 'pinia'
import { isDeviceRegistered } from './guards/isDeviceRegistered'
import { isNetworkRegistered } from './guards/isNetworkRegistered'
import { isSessionExpired } from './guards/isSessionExpired'
import { isUuidRegistered } from './guards/isUuidRegistered'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'access-account',
      path: '/access-account',
      component: AccessAccount,
      meta: {
        requiresSession: false
      },
    },
    {
      name: 'create-account',
      path: '/create-account',
      component: CreateAccount,
      meta: {
        requiresSession: false
      },
    },
    {
      name: 'recover-account',
      path: '/recover-account',
      component: RecoverAccount,
      meta: {
        requiresSession: false
      },
    },
    {
      name: 'check-device',
      path: '/:userUuid/check-device',
      component: CheckDevice,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired]
    },
    {
      name: 'check-network',
      path: '/:userUuid/check-network',
      component: CheckNetwork,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired]
    },
    {
      name: 'register-device',
      path: '/:userUuid/register-device',
      component: RegisterDevice,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired]
    },
    {
      name: 'register-network',
      path: '/:userUuid/register-network',
      component: RegisterNetwork,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired]
    },
    {
      name: 'dashboard',
      path: '/:userUuid/dashboard',
      component: Dashboard,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isDeviceRegistered, isNetworkRegistered],
    }
  ]
})

router.beforeEach(isUuidRegistered)

createApp(App).use(router).use(createPinia()).mount('#app')
