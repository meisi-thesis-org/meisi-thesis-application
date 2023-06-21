import uuid from 'uuid';
import randomstring from 'randomstring';

export class GeneratorService {
  private static _instance: GeneratorService | null = null;

  public static get instance(): GeneratorService {
    if (this._instance === null) {
      this._instance = new GeneratorService();
    }

    return this._instance;
  }

  public generateUuid(): string {
    return uuid.v4();
  }

  public generateRandomString(length: number): string {
    return randomstring.generate(length);
  }
}
