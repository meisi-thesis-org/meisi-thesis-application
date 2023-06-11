export class RefreshAccessCodeRequest {
  public constructor(
    private readonly _username: string,
    private readonly _email: string,
    private readonly _phoneNumber: string
  ) {}

  public get username(): string {
    return this._username;
  }

  public get email(): string {
    return this._email;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }
}
