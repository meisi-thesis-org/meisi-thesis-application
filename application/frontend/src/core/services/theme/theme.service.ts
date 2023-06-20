import { BehaviorSubject, type Observable } from 'rxjs';
import { ThemeCollection } from '../../../shared/collections/theme.collection';

export class ThemeService {
  private static _instance: ThemeService | undefined = undefined;
  private readonly _state: BehaviorSubject<ThemeCollection> = new BehaviorSubject<ThemeCollection>(ThemeCollection.DARK_THEME);
  private readonly _state$: Observable<ThemeCollection> = this._state.asObservable();

  private constructor() {}

  public static get instance(): ThemeService {
    if (this._instance === undefined) {
      this._instance = new ThemeService();
    }

    return this._instance;
  }

  public get state$(): Observable<ThemeCollection> {
    return this._state$;
  }

  public updateState(): void {
    const { DARK_THEME, LIGHT_THEME } = ThemeCollection;
    this._state.next(this._state.value === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  }

  public isDarkTheme(): boolean {
    return this._state.value === ThemeCollection.DARK_THEME;
  }

  public isLightTheme(): boolean {
    return this._state.value === ThemeCollection.LIGHT_THEME;
  }
}
