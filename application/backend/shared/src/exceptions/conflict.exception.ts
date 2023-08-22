export class ConflictException extends Error {
  private readonly httpCode: number;

  public constructor () {
    super();

    this.httpCode = 409;
  }
}
