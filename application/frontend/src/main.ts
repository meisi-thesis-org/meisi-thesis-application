import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import CreateAccount from "@/pages/CreateAccount.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/create-account",
            component: CreateAccount
        }
    ], 
})

createApp(App).use(router).mount('#app')
