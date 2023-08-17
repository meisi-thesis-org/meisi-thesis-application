import { type UUID } from 'crypto'
import { CryptoProvider } from '@meisi-thesis/application-backend-shared/src/providers/crypto.provider';

export class UserEntity {
  private readonly uuid: UUID;
  private readonly createdAt: Date;
  private readonly updatedAt: Date

  public constructor (
    private readonly username: string,
    private readonly email: string,
    private readonly phoneNumber: string,
    private readonly accessCode: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly dateBirth: string
  ) {
    this.uuid = new CryptoProvider().randomUUID();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  public getUuid (): UUID {
    return this.uuid
  }

  public getUsername (): string {
    return this.username
  }

  public getEmail (): string {
    return this.email
  }

  public getPhoneNumber (): string {
    return this.phoneNumber
  }

  public getAccessCode (): string {
    return this.accessCode
  }

  public getFirstName (): string {
    return this.firstName
  }

  public getLastName (): string {
    return this.lastName
  }

  public getDateBirth (): string {
    return this.dateBirth;
  }

  public getCreatedAt (): Date {
    return this.createdAt;
  }

  public getUpdatedAt (): Date {
    return this.updatedAt;
  }
}
