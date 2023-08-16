export class SignInRequest {
  public constructor (
    private readonly accessCode: string
  ) {}

  public getAccessCode (): string {
    return this.accessCode;
  }
}
