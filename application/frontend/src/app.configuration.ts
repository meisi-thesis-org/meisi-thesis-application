export class AppConfiguration {
  private static _instance: AppConfiguration | undefined = undefined;

  public static get instance(): AppConfiguration {
    if (this._instance === undefined) {
      this._instance = new AppConfiguration();
    }

    return this._instance;
  }
}
