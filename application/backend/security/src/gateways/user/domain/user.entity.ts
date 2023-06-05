import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @Column('uuid')
  private readonly _uuid: string;

  public get uuid(): string {
    return this._uuid;
  }

  @Column('username')
  private readonly _username: string;

  public get username(): string {
    return this._username;
  }

  @Column('email')
  private readonly _email: string;

  public get email(): string {
    return this._email;
  }

  @Column('phone_number')
  private readonly _phoneNumber: string;

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  @Column('first_name')
  private readonly _firstName: string;

  public get firstName(): string {
    return this._firstName;
  }

  @Column('last_name')
  private readonly _lastName: string;

  public get lastName(): string {
    return this._lastName;
  }

  @Column('date_birth')
  private readonly _dateBirth: Date;

  public get dateBirth(): Date {
    return this._dateBirth;
  }

  @Column('access_code')
  private readonly _accessCode: string;

  public get accessCode(): string {
    return this._accessCode;
  }

  @Column('access_token')
  private readonly _accessToken: string;

  public get accessToken(): string {
    return this._accessToken;
  }

  @Column('refresh_token')
  private readonly _refreshToken: string;

  public get refreshToken(): string {
    return this._refreshToken;
  }

  @Column('blocked')
  private readonly _blocked: boolean;

  public get blocked(): boolean {
    return this._blocked;
  }

  @Column('deactivated')
  private readonly _deactivated: boolean;

  public get deactivated(): boolean {
    return this._deactivated;
  }

  @Column('accepted_privacy_terms')
  private readonly _acceptedPrivacyTerms: boolean;

  public get acceptedPrivacyTerms(): boolean {
    return this._acceptedPrivacyTerms;
  }

  @CreateDateColumn('created_at')
  private readonly _createdAt!: Date;

  public get createdAt(): Date {
    return this._createdAt;
  }

  @UpdateDateColumn('updated_at')
  private readonly _updatedAt!: Date;

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
    accessCode: string,
    accessToken: string,
    refreshToken: string,
    blocked: boolean,
    deactivated: boolean,
    acceptedPrivacyTerms: boolean
  ) {
    this._uuid = uuid
    this._username = username;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._firstName = firstName;
    this._lastName = lastName;
    this._dateBirth = dateBirth;
    this._accessCode = accessCode;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._blocked = blocked;
    this._deactivated = deactivated;
    this._acceptedPrivacyTerms = acceptedPrivacyTerms;
  }
}
