import crypto from 'crypto';

export class UuidProvider {
  public randomUuid(): string {
    return crypto.randomUUID();
  }
}
