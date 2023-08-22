export class InternalServerException extends Error {
  private readonly httpCode: number;

  public constructor () {
    super();

    this.httpCode = 500;
  }
}
