import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @Column({ name: 'uuid', unique: true, update: false })
  private readonly _uuid: string;

  public get uuid(): string {
    return this._uuid;
  }

  @Column({ name: 'username', unique: true })
  private readonly _username: string;

  public get username(): string {
    return this._username;
  }

  @Column({ name: 'email', unique: true })
  private readonly _email: string;

  public get email(): string {
    return this._email;
  }

  @Column({ name: 'phone_number', unique: true })
  private readonly _phoneNumber: string;

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  @Column({ name: 'first_name', unique: true })
  private readonly _firstName: string;

  public get firstName(): string {
    return this._firstName;
  }

  @Column({ name: 'last_name', unique: true })
  private readonly _lastName: string;

  public get lastName(): string {
    return this._lastName;
  }

  @Column({ name: 'date_birth' })
  private readonly _dateBirth: Date;

  public get dateBirth(): Date {
    return this._dateBirth;
  }

  @Column({ name: 'access_code' })
  private readonly _accessCode: string;

  public get accessCode(): string {
    return this._accessCode;
  }

  @Column({ name: 'access_token' })
  private readonly _accessToken: string;

  public get accessToken(): string {
    return this._accessToken;
  }

  @Column({ name: 'refresh_token' })
  private readonly _refreshToken: string;

  public get refreshToken(): string {
    return this._refreshToken;
  }

  @Column({ name: 'blocked' })
  private readonly _blocked: boolean;

  public get blocked(): boolean {
    return this._blocked;
  }

  @Column({ name: 'deactivated' })
  private readonly _deactivated: boolean;

  public get deactivated(): boolean {
    return this._deactivated;
  }

  @Column({ name: 'accepted_privacy_terms' })
  private readonly _acceptedPrivacyTerms: boolean;

  public get acceptedPrivacyTerms(): boolean {
    return this._acceptedPrivacyTerms;
  }

  @CreateDateColumn({ name: 'created_at' })
  private readonly _createdAt!: Date;

  public get createdAt(): Date {
    return this._createdAt;
  }

  @UpdateDateColumn({ name: 'updated_at' })
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
    this._uuid = uuid;
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
