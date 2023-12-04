import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import SignInPage from "./pages/sign-in.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/sign-in', component: SignInPage }
    ], 
})

createApp(App).use(router).mount('#app')
