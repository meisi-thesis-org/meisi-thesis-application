import { type UUID, randomUUID, randomBytes } from 'crypto';

export class RandomizerProvider {
  public randomUUID (): UUID {
    return randomUUID();
  }

  public randomString (length: number): string {
    return randomBytes(length).toString();
  }
}
