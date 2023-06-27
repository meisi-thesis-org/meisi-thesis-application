import { EncoderProvider } from './providers/encoder.provider';
import { GeneratorProvider } from './providers/generator.provider';

export class SecurityConfiguration {
  private static instance: SecurityConfiguration | null = null;

  /** Instances */
  private readonly generatorProvider: GeneratorProvider;
  private readonly encoderProvider: EncoderProvider;

  private constructor() {
    this.generatorProvider = new GeneratorProvider();
    this.encoderProvider = new EncoderProvider();
  }

  public static getInstance(): SecurityConfiguration {
    if (this.instance === null) {
      this.instance = new SecurityConfiguration();
    }

    return this.instance;
  }

  public getGeneratorProvider(): GeneratorProvider {
    return this.generatorProvider;
  }

  public getEncoderProvider(): EncoderProvider {
    return this.encoderProvider;
  }
}
