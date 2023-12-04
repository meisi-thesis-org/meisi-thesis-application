import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import SignInPage from "./pages/sign-in.vue"
import SignUpPage from "./pages/sign-up.vue"
import RecoverAccessCode from "./pages/recover-access-code.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/sign-in', component: SignInPage },
        { path: '/sign-up', component: SignUpPage },
        { path: '/recover-access-code', component: RecoverAccessCode },
    ], 
})

createApp(App).use(router).mount('#app')
