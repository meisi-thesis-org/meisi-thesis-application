import { type HttpCodeCollection } from '../collections/http-code.collection';
import { type HttpMessageCollection } from '../collections/http-message.collection';

export abstract class Exception {
  protected constructor(
    protected readonly _httpCode: HttpCodeCollection,
    protected readonly _httpMessage: HttpMessageCollection
  ) {}

  public get httpCode(): HttpCodeCollection {
    return this._httpCode;
  }

  public get httpMessage(): HttpMessageCollection {
    return this._httpMessage;
  }
}
