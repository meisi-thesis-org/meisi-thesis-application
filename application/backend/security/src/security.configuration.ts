import { UuidProvider } from './../../shared/src/providers/uuid.provider';
import { RandomStringProvider } from './../../shared/src/providers/random-string.provider';
import { RandomStringEncoderProvider } from './../../shared/src/providers/random-string-encoder.provider';
import { RandomTokenProvider } from './../../shared/src/providers/random-token.provider';
export class SecurityConfiguration {
  private static _instance: SecurityConfiguration | null = null;

  public static get instance(): SecurityConfiguration {
    if (this._instance === null) {
      this._instance = new SecurityConfiguration();
    }

    return this._instance;
  }

  public get uuidProvider(): UuidProvider {
    return new UuidProvider();
  }

  public get randomStringProvider(): RandomStringProvider {
    return new RandomStringProvider();
  }

  public get randomStringEncoderProvider(): RandomStringEncoderProvider {
    return new RandomStringEncoderProvider();
  }

  public get randomTokenProvider(): RandomTokenProvider {
    return new RandomTokenProvider();
  }
}
