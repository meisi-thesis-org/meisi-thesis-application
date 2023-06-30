import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  private readonly uuid!: string;

  @Column({ name: 'username', unique: true, nullable: false })
  private readonly username: string;

  @Column({ name: 'email', unique: true, nullable: false })
  private readonly email: string;

  @Column({ name: 'phone_number', unique: true, nullable: false })
  private readonly phoneNumber: string;

  @Column({ name: 'first_name', nullable: false })
  private readonly firstName: string;

  @Column({ name: 'last_name', nullable: false })
  private readonly lastName: string;

  @Column({ name: 'date_birth', nullable: false })
  private readonly dateBirth: Date;

  @Column({ name: 'access_code', nullable: false })
  private readonly accessCode: string;

  @Column({ name: 'access_token', nullable: true })
  private accessToken: string | null;

  @Column({ name: 'refresh_token', nullable: true })
  private refreshToken: string | null;

  @Column({ name: 'blocked' })
  private readonly blocked: boolean;

  @Column({ name: 'deactivate' })
  private readonly deactivated: boolean;

  @Column({ name: 'accepted_privacy_terms' })
  private readonly acceptedPrivacyTerms: boolean;

  @Column({ name: 'created_at' })
  private createdAt!: Date;

  @Column({ name: 'update_at' })
  private updatedAt!: Date;

  @BeforeInsert()
  public onCreate(): void {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  public onUpdate(): void {
    this.updatedAt = new Date();
  }

  public constructor(
    username: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    dateBirth: Date,
    accessCode: string
  ) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateBirth = dateBirth;
    this.accessCode = accessCode;
    this.accessToken = null;
    this.refreshToken = null;
    this.blocked = false;
    this.deactivated = false;
    this.acceptedPrivacyTerms = false;
  }

  public getUuid(): string {
    return this.uuid
  }

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getDateBirth(): Date {
    return this.dateBirth;
  }

  public getAccessCode(): string {
    return this.accessCode;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public setAccessToken(value: string | null): void {
    this.accessToken = value;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public setRefreshToken(value: string | null): void {
    this.refreshToken = value;
  }

  public getBlocked(): boolean {
    return this.blocked;
  }

  public getDeactivated(): boolean {
    return this.deactivated;
  }

  public getAcceptedPrivacyTerms(): boolean {
    return this.acceptedPrivacyTerms;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
