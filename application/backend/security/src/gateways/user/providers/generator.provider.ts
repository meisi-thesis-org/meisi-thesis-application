import * as uuid from 'uuid';
import * as randomstring from 'randomstring';

export class GeneratorProvider {
  public generateUuid(): string {
    return uuid.v4();
  }

  public generateRandomString(length: number): string {
    return randomstring.generate(length);
  }
}
