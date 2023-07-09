import { Injectable } from '@angular/core';
import { Storage } from '../storage/storage.abstract';
import { StorageCollection } from 'src/app/shared/collections/storage.collection';
import { ThemeCollection } from 'src/app/shared/collections/theme.collection';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public constructor(
    private readonly storage: Storage
  ) {
    this.defineBaseTheme();
  }

  private defineBaseTheme(): void {
    this.storage.save(StorageCollection.THEME, ThemeCollection.LIGHT_THEME);
  }

  public isLightTheme(): boolean {
    return this.fetchTheme() === ThemeCollection.LIGHT_THEME;
  }

  public isDarkTheme(): boolean {
    return this.fetchTheme() === ThemeCollection.DARK_THEME;
  }

  public reverseTheme(): void {
    this.storage.save(
      StorageCollection.THEME,
      Object.values(ThemeCollection).find((theme) => theme !== this.fetchTheme())
    );
  }

  public fetchTheme(): ThemeCollection {
    return this.storage.fetch(StorageCollection.THEME);
  }
}
