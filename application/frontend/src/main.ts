import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.component.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { SignUpComponent } from './pages/sign-up';
import { SignInComponent } from './pages/sign-in';
import { RefreshAccessCodeComponent } from './pages/refresh-access-code';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DashboardComponent } from './pages/dashboard';

const routes = [
  { path: '/dashboard', component: DashboardComponent, beforeEnter: AuthenticationGuard },
  { path: '/sign-up', component: SignUpComponent, beforeEnter: AuthenticationGuard },
  { path: '/sign-in', component: SignInComponent, beforeEnter: AuthenticationGuard },
  { path: '/refresh-access-code', component: RefreshAccessCodeComponent },
  { path: '/', component: SignInComponent, beforeEnter: AuthenticationGuard }
]

const createdRouter = createRouter({ history: createWebHistory(), routes });
const createdPinia = createPinia();

createApp(App)
  .use(createdRouter)
  .use(createdPinia)
  .mount('#app')
