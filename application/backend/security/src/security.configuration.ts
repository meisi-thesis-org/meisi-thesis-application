import { UuidProvider } from '../../shared/providers/uuid.provider';

export class SecurityConfiguration {
  private static _instance: SecurityConfiguration | null = null;

  public static get instance(): SecurityConfiguration {
    if (this._instance === null) {
      this._instance = new SecurityConfiguration();
    }

    return this._instance;
  }

  public uuidProvider(): UuidProvider {
    return new UuidProvider();
  }
}
