import { EncoderProvider } from './shared/providers/encoder.provider';
import { GeneratorProvider } from './shared/providers/generator.provider';
import { NodemailerProvider } from './shared/providers/nodemailer.provider';
import { TokenProvider } from './shared/providers/token.provider';

export class SecurityConfiguration {
  private static instance: SecurityConfiguration | null = null;

  public static getInstance(): SecurityConfiguration {
    if (this.instance === null) {
      this.instance = new SecurityConfiguration();
    }

    return this.instance;
  }

  public getGeneratorProvider(): GeneratorProvider {
    return GeneratorProvider.getInstance();
  }

  public getEncoderProvider(): EncoderProvider {
    return EncoderProvider.getInstance();
  }

  public getTokenProvider(): TokenProvider {
    return TokenProvider.getInstance();
  }

  public getNodemailerProvider(): NodemailerProvider {
    return NodemailerProvider.getInstance();
  }
}
