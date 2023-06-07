export class RandomStringProvider {
  private static _instance: RandomStringProvider | null = null;

  public static get instance(): RandomStringProvider {
    if (this._instance === null) {
      this._instance = new RandomStringProvider();
    }

    return this._instance;
  }

  public generate(length: number): string {
    return '';
  }
}
