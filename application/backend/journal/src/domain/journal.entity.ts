import { type UUID } from 'crypto';

export class JournalEntity<T> {
  public constructor (
    private readonly uuid: UUID,
    private readonly severity: 'Error' | 'Warning' | 'Info',
    private readonly correlationUuid: UUID,
    private readonly url: string,
    private readonly cause: T
  ) {}

  public getUuid (): UUID {
    return this.uuid;
  }

  public getSeverity (): 'Error' | 'Warning' | 'Info' {
    return this.severity;
  }

  public getCorrelationUuid (): UUID {
    return this.correlationUuid;
  }

  public getUrl (): string {
    return this.url;
  }

  public getCause (): T {
    return this.cause;
  }
}
