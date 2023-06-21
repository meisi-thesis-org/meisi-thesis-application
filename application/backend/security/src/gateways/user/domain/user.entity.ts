import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ unique: true, type: 'uuid', name: 'uuid' })
  private readonly uuid: string;

  @Column({ unique: true, type: 'string', name: 'username' })
  private readonly username: string;

  @Column({ unique: true, type: 'string', name: 'email' })
  private readonly email: string;

  @Column({ unique: true, type: 'string', name: 'phone_number' })
  private readonly phoneNumber: string;

  @Column({ type: 'string', name: 'first_name' })
  private readonly firstName: string;

  @Column({ type: 'string', name: 'last_name' })
  private readonly lastName: string;

  @Column({ type: 'date', name: 'date_birth' })
  private readonly dateBirth: Date;

  @Column({ type: 'string', name: 'access_code' })
  private readonly accessCode: string;

  @Column({ type: 'string', name: 'access_token' })
  private readonly accessToken: string | null;

  @Column({ type: 'string', name: 'refresh_token' })
  private readonly refreshToken: string | null;

  @Column({ type: 'boolean', name: 'activated' })
  private activated: boolean;

  @Column({ type: 'boolean', name: 'deactivated' })
  private deactivated: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)' })
  private readonly createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  private readonly updatedAt: Date | null;

  public constructor(
    uuid: string,
    username: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    dateBirth: Date,
    accessCode: string
  ) {
    super();

    this.uuid = uuid;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateBirth = dateBirth;
    this.accessCode = accessCode;
    this.accessToken = null;
    this.refreshToken = null;
    this.activated = false;
    this.deactivated = false;
    this.createdAt = null;
    this.updatedAt = null;
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

  public getActivated(): boolean {
    return this.activated;
  }

  public setActivated(value: boolean): void {
    this.activated = value;
  }

  public getDeactivated(): boolean {
    return this.deactivated;
  }

  public setDeactivated(value: boolean): void {
    this.deactivated = value;
  }

  public getCreatedAt(): Date | null {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
