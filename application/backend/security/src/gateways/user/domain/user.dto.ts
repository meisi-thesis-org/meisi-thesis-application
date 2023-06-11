export class UserDTO {
  public constructor(
    private readonly _uuid: string,
    private readonly _username: string,
    private readonly _email: string,
    private readonly _phoneNumber: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _dateBirth: Date,
    private readonly _accessToken: string | null,
    private readonly _refreshToken: string | null,
    private readonly _blocked: boolean,
    private readonly _deactivated: boolean,
    private readonly _acceptedPrivacyTerms: boolean,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {}

  public get uuid(): string {
    return this._uuid;
  }

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

  public get accessToken(): string | null {
    return this._accessToken;
  }

  public get refreshToken(): string | null {
    return this._refreshToken;
  }

  public get blocked(): boolean {
    return this._blocked;
  }

  public get deactivated(): boolean {
    return this._deactivated;
  }

  public get acceptedPrivacyTerms(): boolean {
    return this._acceptedPrivacyTerms;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
