import { HttpStatusCode } from '../collections/http-status-code.collection';

export class AlreadyExistsResourceException extends Error {
  private readonly _status: HttpStatusCode;
  private readonly _body: string;

  public constructor() {
    super();

    this._status = HttpStatusCode.ALREADY_EXISTS_RESOURCE;
    this._body = 'AlreadyExists Resource!'
  }

  public get status(): HttpStatusCode {
    return this._status;
  }

  public get body(): string {
    return this._body;
  }
}
