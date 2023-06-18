import { Injectable, type OnDestroy } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';
import { ThemeCollection } from './theme.collection';
import { Storage } from '../storage/storage.abstract';
import { StorageCollection } from '../storage/storage.collection';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private readonly _state: BehaviorSubject<ThemeCollection>;
  private readonly _state$: Observable<ThemeCollection>;

  public constructor(
    private readonly _storage: Storage
  ) {
    this._state = new BehaviorSubject<ThemeCollection>(this.defineBaseTheme());
    this._state$ = this._state.asObservable();
  }

  private defineBaseTheme(): ThemeCollection {
    const storedTheme = this._storage.fetch<ThemeCollection>(StorageCollection.THEME);

    if (storedTheme === null) {
      this._storage.save(StorageCollection.THEME, ThemeCollection.LIGHT_THEME)
      return ThemeCollection.DARK_THEME;
    }

    return storedTheme;
  }

  public ngOnDestroy(): void {
    this._state.unsubscribe();
  }

  public get state$(): Observable<ThemeCollection> {
    return this._state$;
  }

  public updateState(): void {
    const theme = this.isDarkTheme() ? ThemeCollection.LIGHT_THEME : ThemeCollection.DARK_THEME;
    console.log(theme);
    this._state.next(theme);
    this._storage.save(StorageCollection.THEME, theme)
  }

  public isDarkTheme(): boolean {
    return this._state.value === ThemeCollection.DARK_THEME
  }

  public isLightTheme(): boolean {
    return this._state.value === ThemeCollection.LIGHT_THEME
  }
}
