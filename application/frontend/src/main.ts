import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AccessAccount from '@/pages/AccessAccount.vue'
import CreateAccount from '@/pages/CreateAccount.vue'
import RecoverAccount from '@/pages/RecoverAccount.vue'
import CheckDevice from '@/pages/CheckDevice.vue'
import CheckNetwork from '@/pages/CheckNetwork.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Library from '@/pages/Library.vue'
import Dossier from '@/pages/Dossier.vue'
import Book from '@/pages/Book.vue'
import Chapter from '@/pages/Chapter.vue'
import Page from '@/pages/Page.vue'
import RegisterDevice from '@/pages/RegisterDevice.vue'
import RegisterNetwork from '@/pages/RegisterNetwork.vue'
import RegisterDossier from '@/pages/RegisterDossier.vue'
import RecoverDossier from '@/pages/RecoverDossier.vue'
import RecoverBook from '@/pages/RecoverBook.vue'
import RecoverChapter from '@/pages/RecoverChapter.vue'
import RecoverPage from '@/pages/RecoverPage.vue'
import Setting from "@/pages/Setting.vue"
import { createPinia } from 'pinia'
import { isDeviceRegistered } from './guards/isDeviceRegistered'
import { isNetworkRegistered } from './guards/isNetworkRegistered'
import { isSessionExpired } from './guards/isSessionExpired'
import { isDossierRegistered } from './guards/isDossierRegistered'
import { isUserRegistered } from './guards/isUserRegistered'
import { isBookRegistered } from './guards/isBookRegistered'
import { isChapterRegistered } from './guards/isChapterRegistered'
import { isPageRegistered } from './guards/isPageRegistered'
import { isWalletRegistered } from './guards/isWalletRegistered'
import { isSubscriptionsRegistered } from './guards/isSubscriptionsRegistered'

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
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered]
    },
    {
      name: 'dashboard',
      path: '/:userUuid/dashboard',
      component: Dashboard,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered],
    },
    {
      name: 'library',
      path: '/:userUuid/library',
      component: Library,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered],
    },
    {
      name: 'recover-dossier',
      path: '/:userUuid/recover-dossier/:dossierUuid',
      component: RecoverDossier,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered],
    },
    {
      name: 'recover-book',
      path: '/:userUuid/dossier/:dossierUuid?/recover-book/:bookUuid',
      component: RecoverBook,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered, isBookRegistered],
    },
    {
      name: 'recover-chapter',
      path: '/:userUuid/dossier/:dossierUuid?/recover-book/:bookUuid/recover-chapter/:chapterUuid',
      component: RecoverChapter,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered, isBookRegistered, isChapterRegistered],
    },
    {
      name: 'recover-page',
      path: '/:userUuid/dossier/:dossierUuid?/recover-book/:bookUuid/recover-chapter/:chapterUuid/recover-page/:pageUuid',
      component: RecoverPage,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered, isBookRegistered, isChapterRegistered, isPageRegistered],
    },
    {
      name: 'dossier',
      path: '/:userUuid/dossier/:dossierUuid?',
      component: Dossier,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered],
    },
    {
      name: 'book',
      path: '/:userUuid/dossier/:dossierUuid/book/:bookUuid',
      component: Book,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered, isBookRegistered],
    },
    {
      name: 'chapter',
      path: '/:userUuid/dossier/:dossierUuid/book/:bookUuid/chapter/:chapterUuid',
      component: Chapter,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered, isBookRegistered, isChapterRegistered],
    },
    {
      name: 'page',
      path: '/:userUuid/dossier/:dossierUuid/book/:bookUuid/chapter/:chapterUuid/page/:pageUuid',
      component: Page,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered, isSubscriptionsRegistered, isDossierRegistered, isBookRegistered, isChapterRegistered, isPageRegistered],
    },
    {
      name: 'setting',
      path: '/:userUuid/setting',
      component: Setting,
      meta: {
        requiresSession: true
      },
      beforeEnter: [isSessionExpired, isUserRegistered, isDeviceRegistered, isNetworkRegistered, isWalletRegistered],
    }
  ]
})

createApp(App).use(router).use(createPinia()).mount('#app')
