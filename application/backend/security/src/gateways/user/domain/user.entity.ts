import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  private readonly uuid!: string;

  @Column({ name: 'username', type: 'text' })
  private readonly username: string;

  @Column({ name: 'email', type: 'text' })
  private readonly email: string;

  @Column({ name: 'phone_number', type: 'text' })
  private readonly phoneNumber: string;

  @Column({ name: 'first_name', type: 'text' })
  private readonly firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  private readonly lastName: string;

  @Column({ name: 'date_birth', type: 'date' })
  private readonly dateBirth: Date;

  @Column({ name: 'access_code', type: 'text' })
  private readonly accessCode: string;

  @Column({ name: 'access_token', type: 'text' })
  private readonly accessToken: string | null;

  @Column({ name: 'refresh_token', type: 'text' })
  private readonly refreshToken: string | null;

  @Column({ name: 'blocked', type: 'boolean' })
  private readonly blocked: boolean;

  @Column({ name: 'deactivated', type: 'boolean' })
  private readonly deactivated: boolean;

  @Column({ name: 'accepted_privacy_terms', type: 'boolean' })
  private readonly acceptedPrivacyTerms: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'date', nullable: false, update: false })
  private readonly createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'date', nullable: false })
  private readonly updatedAt!: Date;

  public constructor(
    username: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    datebirth: Date,
    accessCode: string
  ) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateBirth = datebirth;
    this.accessCode = accessCode;
    this.accessToken = null;
    this.refreshToken = null;
    this.blocked = false;
    this.deactivated = false;
    this.acceptedPrivacyTerms = false;
  }

  public getUuid(): string {
    return this.uuid;
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

  public getRefreshToken(): string | null {
    return this.refreshToken;
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
