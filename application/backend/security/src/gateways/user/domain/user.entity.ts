import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { SecurityConfiguration } from '../../../security.configuration';

@Entity('users')
export class UserEntity {
  @Column({
    unique: true,
    name: 'uuid',
    type: 'uuid',
    update: false
  })
  private readonly _uuid: string;

  @Column({
    name: 'username',
    type: 'string'
  })
  private readonly _username: string;

  @Column({
    name: 'email',
    type: 'string'
  })
  private readonly _email: string;

  @Column({
    name: 'phone_number',
    type: 'string'
  })
  private readonly _phoneNumber: string;

  @Column({
    name: 'first_name',
    type: 'string'
  })
  private readonly _firstName: string;

  @Column({
    name: 'last_name',
    type: 'string'
  })
  private readonly _lastName: string;

  @Column({
    name: 'date_birth',
    type: 'date'
  })
  private readonly _dateBirth: Date;

  @Column({
    name: 'access_code',
    type: 'string'
  })
  private readonly _accessCode: string;

  @Column({
    name: 'access_token',
    type: 'string'
  })
  private readonly _accessToken: string;

  @Column({
    name: 'refresh_token',
    type: 'string'
  })
  private readonly _refreshToken: string;

  @Column({
    name: 'blocked',
    type: 'boolean'
  })
  private readonly _blocked: boolean;

  @Column({
    name: 'deactivated',
    type: 'boolean'
  })
  private readonly _deactivated: boolean;

  @Column({
    name: 'accepted_privacy_terms',
    type: 'boolean'
  })
  private readonly _acceptedPrivacyTerms: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date'
  })
  private readonly _createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'date'
  })
  private readonly _updatedAt!: Date;

  public constructor(
    username: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    dateBirth: Date
  ) {
    this._uuid = SecurityConfiguration.instance.uuidProvider().v4()
    this._username = username;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._firstName = firstName;
    this._lastName = lastName;
    this._firstName = firstName;
    this._dateBirth = dateBirth;
    this._accessCode = '';
    this._accessToken = '';
    this._refreshToken = '';
    this._blocked = false;
    this._deactivated = false;
    this._acceptedPrivacyTerms = false;
  }

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

  public get accessCode(): string {
    return this._accessCode;
  }

  public get accessToken(): string {
    return this._accessToken;
  }

  public get refreshToken(): string {
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
