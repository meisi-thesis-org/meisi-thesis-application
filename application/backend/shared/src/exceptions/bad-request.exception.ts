import * as HttpCode from './../types/http-code.type';

export class BadRequestException extends Error {
  private readonly httpCode: HttpCode.Keys;

  public constructor (
    cause: string
  ) {
    super(cause);

    this.httpCode = HttpCode.Collection.BAD_REQUEST;
  }

  public getHttpCode (): HttpCode.Keys {
    return this.httpCode;
  }
}
