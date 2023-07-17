import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.component.vue'

createApp(App).use(createPinia()).mount('#app')
