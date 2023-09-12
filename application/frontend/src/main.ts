import { createApp } from 'vue'
import App from './app.component.vue'
import StorageServicePlugin from './plugins/storage-service.plugin'

createApp(App)
  .use(StorageServicePlugin)
  .mount('#app')
