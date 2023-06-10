export class SignInRequest {
  public constructor(
    private readonly _accessCode: string
  ) {}

  public get accessCode(): string {
    return this._accessCode;
  }
}
