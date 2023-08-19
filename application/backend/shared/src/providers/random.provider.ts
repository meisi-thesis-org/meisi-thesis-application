import { randomUUID, type UUID } from 'crypto';

export class RandomProvider {
  public randomUuid (): UUID {
    return randomUUID();
  }
}
