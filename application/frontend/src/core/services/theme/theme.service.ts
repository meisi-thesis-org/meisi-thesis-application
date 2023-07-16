import { StorageCollection } from '@/shared/collections/storage.collection';
import type { Storage } from '../storage/storage.abstract';
import { ThemeCollection } from '@/shared/collections/theme.collection';

export class ThemeService {
  public constructor(
    private readonly storage: Storage
  ) {
    this.defineBaseTheme();
  }

  public fetchStoredTheme(): ThemeCollection {
    return this.storage.fetch(StorageCollection.THEME);
  }

  private defineBaseTheme(): void {
    const storedTheme = this.fetchStoredTheme();

    this.storage.save(StorageCollection.THEME, storedTheme ?? ThemeCollection.DARK);
  }

  public updateTheme(): void {
    const storedTheme = this.fetchStoredTheme();
    const themeToStore = Object.values(ThemeCollection).find((theme) => theme !== storedTheme);

    console.log(storedTheme)

    this.storage.save(StorageCollection.THEME, themeToStore)
  }

  public isDarkTheme(): boolean {
    return this.fetchStoredTheme() === ThemeCollection.DARK
  }

  public isLightTheme(): boolean {
    return this.fetchStoredTheme() === ThemeCollection.LIGHT
  }
}
