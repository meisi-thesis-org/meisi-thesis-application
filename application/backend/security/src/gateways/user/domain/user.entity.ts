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

  @Column({ type: 'string', name: 'date_birth' })
  private readonly dateBirth: string;

  @Column({ type: 'string', name: 'access_code' })
  private readonly accessCode: string;

  @Column({ type: 'string', name: 'access_token' })
  private accessToken: string | null;

  @Column({ type: 'string', name: 'refresh_token' })
  private refreshToken: string | null;

  @Column({ type: 'boolean', name: 'blocked' })
  private blocked: boolean;

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
    dateBirth: string,
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
    this.blocked = false;
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

  public getDateBirth(): string {
    return this.dateBirth;
  }

  public getAccessCode(): string {
    return this.accessCode;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public setAccessToken(value: string): void {
    this.accessToken = value;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public setRefreshToken(value: string): void {
    this.refreshToken = value;
  }

  public getBlocked(): boolean {
    return this.blocked;
  }

  public setBlocked(value: boolean): void {
    this.blocked = value;
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
