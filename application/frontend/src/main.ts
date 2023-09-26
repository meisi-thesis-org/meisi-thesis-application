import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.component.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { SignUpComponent } from './pages/sign-up';
import { SignInComponent } from './pages/sign-in';
import { RefreshAccessCodeComponent } from './pages/refresh-access-code';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes = [
  { path: '/dashboard', component: SignUpComponent, beforeEnter: AuthenticationGuard },
  { path: '/sign-up', component: SignUpComponent },
  { path: '/sign-in', component: SignInComponent },
  { path: '/refresh-access-code', component: RefreshAccessCodeComponent },
  { path: '/', component: SignInComponent }
]

const createdRouter = createRouter({ history: createWebHistory(), routes });
const createdPinia = createPinia();

createApp(App)
  .use(createdRouter)
  .use(createdPinia)
  .mount('#app')
