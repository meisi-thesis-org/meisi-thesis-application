import { ThemeService } from './core/services/theme/theme.service';

export class AppConfiguration {
  private static _instance: AppConfiguration | undefined = undefined;

  public static get instance(): AppConfiguration {
    if (this._instance === undefined) {
      this._instance = new AppConfiguration();
    }

    return this._instance;
  }

  public themeService(): ThemeService {
    return ThemeService.instance;
  }
}
