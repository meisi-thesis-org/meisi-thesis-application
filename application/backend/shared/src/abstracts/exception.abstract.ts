import { type HttpCodeCollection } from '../collections/http-code.collection';

export abstract class Exception {
  protected constructor(
    private readonly _httpCode: HttpCodeCollection,
    private readonly _message: string
  ) {}

  public get httpCode(): HttpCodeCollection {
    return this._httpCode;
  }

  public get message(): string {
    return this._message;
  }
}
