import * as randomString from 'randomstring';

export class GeneratorProvider {
  public generateRandomString(lenght: number): string {
    return randomString.generate(lenght);
  }
}
