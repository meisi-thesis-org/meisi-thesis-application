import { EncoderService } from './../../shared/src/services/encoder.service';
import { GeneratorService } from './../../shared/src/services/generator.service';

export class SecurityConfiguration {
  private static _instance: SecurityConfiguration | null = null;

  public static get instance(): SecurityConfiguration {
    if (this._instance === null) {
      this._instance = new SecurityConfiguration();
    }

    return this._instance;
  }

  public get encoderService(): EncoderService {
    return EncoderService.instance;
  }

  public get generatorService(): GeneratorService {
    return GeneratorService.instance;
  }
}
