import * as randomstring from 'randomstring';

export class GeneratorProvider {
  private static instance: GeneratorProvider | null = null;

  public static getInstance(): GeneratorProvider {
    if (this.instance === null) {
      this.instance = new GeneratorProvider();
    }

    return this.instance;
  }

  public generateRandomString(length: number): string {
    return randomstring.generate(length);
  }
}
