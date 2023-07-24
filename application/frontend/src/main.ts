import App from './app.component.vue'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './app.router';

/** Styles */
import './assets/scss/$colors.scss';
import './assets/scss/$root.scss';
import './assets/scss/$typography.scss';

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

createApp(App).use(router).mount('#app')
