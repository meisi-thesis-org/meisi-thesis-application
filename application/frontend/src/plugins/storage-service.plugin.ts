import { StorageService } from '@/services/storage.service';
import type { App } from 'vue';

export const StorageServicePlugin = {
  install (app: App): void {
    app.provide('storageService', new StorageService())
  }
}

export default StorageServicePlugin;
