import * as HttpCode from './../types/http-code.type';

export class InternalServerException extends Error {
  private readonly httpCode: HttpCode.Keys;

  public constructor () {
    super();

    this.httpCode = HttpCode.Collection.INTERNAL_SERVER_ERROR;
  }

  public getHttpCode (): HttpCode.Keys {
    return this.httpCode;
  }
}
