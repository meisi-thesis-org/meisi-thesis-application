import { type HttpCodeCollection } from '../collections/http-code.collection';
import { type HttpMessageCollection } from '../collections/http-message.collection';

export abstract class Exception {
  protected constructor(
    protected readonly httpCode: HttpCodeCollection,
    protected readonly httpMessage: HttpMessageCollection
  ) {}

  public getHttpCode(): HttpCodeCollection {
    return this.httpCode;
  }

  public getHttpMessage(): HttpMessageCollection {
    return this.httpMessage;
  }
}
