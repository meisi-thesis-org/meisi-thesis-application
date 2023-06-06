export class SignInRequest {
  public get accessCode(): string {
    return this._accessCode;
  }

  public constructor(
    private readonly _accessCode: string
  ) {}
}
