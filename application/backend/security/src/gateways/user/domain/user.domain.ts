import { type UUID } from 'crypto';

export class UserDTO {
  public constructor (
    private readonly uuid: UUID,
    private readonly email: string,
    private readonly username: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly dateBirth: string,
    private readonly createdAt: string,
    private readonly updatedAt: string
  ) {}

  public getUuid (): UUID {
    return this.uuid;
  }

  public getEmail (): string {
    return this.email;
  }

  public getUsername (): string {
    return this.username;
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
