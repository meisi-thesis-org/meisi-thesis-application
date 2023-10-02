import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.component.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CheckDeviceResolver } from './resolvers/check-device.resolver';
import { CheckLocationResolver } from './resolvers/check-location.resolver';

const routes = [
  { path: '/dashboard', component: async () => await import('@/pages/dashboard/dashboard.component.vue'), beforeEnter: AuthenticationGuard },
  { path: '/sign-up', component: async () => await import('@/pages/sign-up/sign-up.component.vue'), beforeEnter: AuthenticationGuard },
  { path: '/sign-in', component: async () => await import('@/pages/sign-in/sign-in.component.vue'), beforeEnter: AuthenticationGuard },
  { path: '/refresh-access-code', component: async () => await import('@/pages/refresh-access-code/refresh-access-code.component.vue'), beforeEnter: AuthenticationGuard },
  { path: '/check-device', component: async () => await import('@/pages/check-device/check-device.component.vue'), beforeEnter: [AuthenticationGuard, CheckDeviceResolver] },
  { path: '/check-location', component: async () => await import('@/pages/check-location/check-location.component.vue'), beforeEnter: [AuthenticationGuard, CheckLocationResolver] },
  { path: '/', component: async () => await import('@/pages/check-location/check-location.component.vue'), beforeEnter: AuthenticationGuard }
]

const createdRouter = createRouter({ history: createWebHistory(), routes });
const createdPinia = createPinia();

createApp(App)
  .use(createdRouter)
  .use(createdPinia)
  .mount('#app')
