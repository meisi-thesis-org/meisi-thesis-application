import { HttpStatusCode } from '../collections/http-status-code.collection';

export class InternalServerException extends Error {
  private readonly _status: HttpStatusCode;
  private readonly _body: string;

  public constructor() {
    super();

    this._status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    this._body = 'InternalServer Exception!'
  }

  public get status(): HttpStatusCode {
    return this._status;
  }

  public get body(): string {
    return this._body;
  }
}
