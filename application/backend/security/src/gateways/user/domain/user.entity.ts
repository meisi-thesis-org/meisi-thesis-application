import { type UUID } from 'crypto';
import { RandomProvider } from '../../../../../shared/src/providers/random.provider';

export class UserEntity {
  private readonly uuid: UUID;
  private readonly accessToken: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly dateBirth: string;
  private readonly createdAt: string;
  private readonly updatedAt: string;

  public constructor (
    uuid: UUID,
    private readonly email: string,
    private readonly username: string,
    accessToken: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    dateBirth: string | undefined,
    createdAt: string | undefined,
    updatedAt: string | undefined
  ) {
    const randomProvider = new RandomProvider();

    this.uuid = uuid ?? randomProvider.randomUUID();
    this.accessToken = accessToken ?? randomProvider.randomString(60);
    this.firstName = firstName ?? '';
    this.lastName = lastName ?? '';
    this.dateBirth = dateBirth ?? '';
    this.createdAt = createdAt ?? new Date().toISOString();
    this.updatedAt = updatedAt === undefined ? this.createdAt : new Date().toISOString();
  }

  public getUuid (): UUID {
    return this.uuid;
  }

  public getEmail (): string {
    return this.email;
  }

  public getUsername (): string {
    return this.username;
  }

  public getAccessToken (): string {
    return this.accessToken;
  }

  public getFirstName (): string {
    return this.firstName;
  }

  public getLastName (): string {
    return this.lastName;
  }

  public getDateBirth (): string {
    return this.dateBirth;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
