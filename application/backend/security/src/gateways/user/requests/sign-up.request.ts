export class SignUpRequest {
  public constructor(
    private readonly _username: string,
    private readonly _email: string,
    private readonly _phoneNumber: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _dateBirth: Date
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

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get dateBirth(): Date {
    return this._dateBirth;
  }
}
