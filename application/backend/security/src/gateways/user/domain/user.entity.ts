export class UserEntity {
  public constructor (
    private readonly uuid: string,
    private readonly email: string,
    private readonly username: string,
    private readonly phoneNumber: string,
    private readonly accessCode: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly dateBirth: string,
    private readonly createdAt: string,
    private readonly updatedAt: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getEmail (): string {
    return this.email;
  }

  public getUsername (): string {
    return this.username;
  }

  public getPhoneNumber (): string {
    return this.phoneNumber;
  }

  public getAccessCode (): string {
    return this.accessCode;
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
