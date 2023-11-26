import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import SignIn from "@/pages/sign-in/index.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/sign-in", component: SignIn }
    ]
})

createApp(App).use(router).mount('#app')
