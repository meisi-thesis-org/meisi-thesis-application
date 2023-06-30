import { type HttpCodeCollection } from '../collections/http-code.collection';

export abstract class Exception {
  protected constructor(
    protected readonly httpCode: HttpCodeCollection
  ) {}

  public getHttpCode(): HttpCodeCollection {
    return this.httpCode;
  }
}
