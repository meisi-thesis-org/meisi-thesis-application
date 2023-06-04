import * as uuid from 'uuid';

export class UuidProvider {
  public v4(): string {
    return uuid.v4();
  }
}
