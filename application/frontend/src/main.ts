import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import SignIn from '@/pages/SignIn.vue'
import SignUp from '@/pages/SignUp.vue'
import RefreshAccessCode from '@/pages/RefreshAccessCode.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
    { path: '/refresh-access-code', component: RefreshAccessCode }
  ]
})

createApp(App).use(router).mount('#app')
