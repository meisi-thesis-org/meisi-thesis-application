import { randomBytes, randomUUID, type UUID } from 'crypto';

export class RandomProvider {
  public randomUUID (): UUID {
    return randomUUID();
  }

  public randomString (length: number): string {
    return randomBytes(length).toString('hex');
  }
}
