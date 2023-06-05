export class UserDTO {
  private readonly _uuid: string;

  public get uuid(): string {
    return this._uuid;
  }

  private readonly _username: string;

  public get username(): string {
    return this._username;
  }

  private readonly _email: string;

  public get email(): string {
    return this._email;
  }

  private readonly _phoneNumber: string;

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  private readonly _firstName: string;

  public get firstName(): string {
    return this._firstName;
  }

  private readonly _lastName: string;

  public get lastName(): string {
    return this._lastName;
  }

  private readonly _dateBirth: Date;

  public get dateBirth(): Date {
    return this._dateBirth;
  }

  private readonly _accessToken: string;

  public get accessToken(): string {
    return this._accessToken;
  }

  private readonly _refreshToken: string;

  public get refreshToken(): string {
    return this._refreshToken;
  }

  private readonly _blocked: boolean;

  public get blocked(): boolean {
    return this._blocked;
  }

  private readonly _deactivated: boolean;

  public get deactivated(): boolean {
    return this._deactivated;
  }

  private readonly _acceptedPrivacyTerms: boolean;

  public get acceptedPrivacyTerms(): boolean {
    return this._acceptedPrivacyTerms;
  }

  private readonly _createdAt: Date;

  public get createdAt(): Date {
    return this._createdAt;
  }

  private readonly _updatedAt: Date;

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public constructor(
    uuid: string,
    username: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    dateBirth: Date,
    accessToken: string,
    refreshToken: string,
    blocked: boolean,
    deactivated: boolean,
    acceptedPrivacyTerms: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._uuid = uuid
    this._username = username;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._firstName = firstName;
    this._lastName = lastName;
    this._dateBirth = dateBirth;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._blocked = blocked;
    this._deactivated = deactivated;
    this._acceptedPrivacyTerms = acceptedPrivacyTerms;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }
}
