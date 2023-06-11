import { generate } from 'randomstring';

export class RandomStringProvider {
  public generate(length: number): string {
    return generate(length);
  }
}
