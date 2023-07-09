import { type ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Storage } from './core/services/storage/storage.abstract';
import { LocalStorageService } from './core/services/storage/local-storage/local-storage.service';
import { ThemeService } from './core/services/theme/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: Storage, useClass: LocalStorageService },
    ThemeService
  ]
};
