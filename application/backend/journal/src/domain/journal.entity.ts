import { type UUID } from 'crypto';

export class JournalEntity {
  public constructor (
    private readonly uuid: UUID,
    private readonly correlationUuid: UUID,
    private readonly URL: string,
    private readonly cause: string
  ) {}

  public getUuid (): UUID {
    return this.uuid;
  }

  public getCorrelationUuid (): UUID {
    return this.correlationUuid;
  }

  public getURL (): string {
    return this.URL;
  }

  public getCause (): string {
    return this.cause;
  }
}
