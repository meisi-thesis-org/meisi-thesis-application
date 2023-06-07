import * as uuid from 'uuid'

export class UuidProvider {
  private static _instance: UuidProvider | null = null;

  public static get instance(): UuidProvider {
    if (this._instance === null) {
      this._instance = new UuidProvider();
    }

    return this._instance;
  }

  public v4(): string {
    return uuid.v4();
  }
}
