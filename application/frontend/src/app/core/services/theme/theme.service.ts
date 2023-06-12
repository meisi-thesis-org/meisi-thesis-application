import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';
import { ThemeCollection } from '../../../shared/collections/theme.collection';
import { StorageCollection } from '../../../shared/collections/storage.collection';
import { Storage } from '../storage/storage.abstract';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _state: BehaviorSubject<ThemeCollection> = new BehaviorSubject<ThemeCollection>(this.defineTheme());
  private readonly _state$: Observable<ThemeCollection> = this._state.asObservable();

  public constructor(
    private readonly _storage: Storage
  ) {}

  public get state$(): Observable<ThemeCollection> {
    return this._state$;
  }

  private defineTheme(): ThemeCollection {
    const storedTheme = this._storage.getItem<ThemeCollection>(StorageCollection.THEME);

    if (storedTheme === null) {
      this._storage.setItem(StorageCollection.THEME, ThemeCollection.DARK_THEME)
    }

    return storedTheme !== null ? storedTheme : ThemeCollection.DARK_THEME;
  }

  public updateTheme(theme: ThemeCollection): void {
    this._state.next(theme);
  }

  public isDarkTheme(): boolean {
    return this._state.value === ThemeCollection.DARK_THEME;
  }

  public isLightTheme(): boolean {
    return this._state.value === ThemeCollection.LIGHT_THEME;
  }
}
