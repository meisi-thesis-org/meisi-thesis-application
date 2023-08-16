import type * as HttpCode from './../types/http-code.type'

export abstract class Exception extends Error {
  protected constructor (
    protected readonly httpCode: HttpCode.Keys
  ) {
    super();
  }

  public getHttpCode (): HttpCode.Keys {
    return this.httpCode;
  }
}
