import { randomBytes, randomUUID } from 'crypto';

export class RandomProvider {
  public randomUUID (): string {
    return randomUUID().toString();
  }

  public randomString (length: number): string {
    return randomBytes(length).toString('hex');
  }
}
