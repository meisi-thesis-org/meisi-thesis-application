import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AccessAccount from '@/pages/AccessAccount.vue'
import CreateAccount from '@/pages/CreateAccount.vue'
import RecoverAccount from '@/pages/RecoverAccount.vue'
import CheckDevice from '@/pages/CheckDevice.vue'
import CheckNetwork from '@/pages/CheckNetwork.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Dossier from '@/pages/Dossier.vue'
import RegisterDevice from '@/pages/RegisterDevice.vue'
import RegisterNetwork from '@/pages/RegisterNetwork.vue'
import RegisterDossier from '@/pages/RegisterDossier.vue'
import RecoverDossier from '@/pages/RecoverDossier.vue'
import { createPinia } from 'pinia'
import { isDeviceRegistered } from './guards/isDeviceRegistered'
import { isNetworkRegistered } from './guards/isNetworkRegistered'
import { isSessionExpired } from './guards/isSessionExpired'
import { isDossierRegistered } from './guards/isDossierRegistered'
import { isUserRegistered } from './guards/isUserRegistered'

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
      name: 'register-dossier',
      path: '/:userUuid/register-dossier',
      component: RegisterDossier,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered,]
    },
    {
      name: 'dashboard',
      path: '/:userUuid/dashboard',
      component: Dashboard,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered],
    },
    {
      name: 'recover-dossier',
      path: '/:userUuid/recover-dossier',
      component: RecoverDossier,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered],
    },
    {
      name: 'dossier',
      path: '/:userUuid/dossier',
      component: Dossier,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isDossierRegistered],
    }
  ]
})

createApp(App).use(router).use(createPinia()).mount('#app')
