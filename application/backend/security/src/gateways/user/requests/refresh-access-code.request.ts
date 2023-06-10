export class RefreshAccessCodeRequest {
  public constructor(
    private readonly _username: string | undefined,
    private readonly _email: string | undefined,
    private readonly _phoneNumber: string | undefined
  ) {}

  public get username(): string | undefined {
    return this._username;
  }

  public get email(): string | undefined {
    return this._email;
  }

  public get phoneNumber(): string | undefined {
    return this._phoneNumber;
  }
}
