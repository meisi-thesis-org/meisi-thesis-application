import { type UUID } from 'crypto';

export class UserDTO {
  public constructor(
    private readonly uuid: UUID,
    private readonly username: string,
    private readonly email: string,
    private readonly phoneNumber: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly dateBirth: Date
  ) {}

  public getUuid(): UUID {
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
}
