export class UserEntity {
  public constructor (
    private readonly uuid: string,
    private readonly email: string,
    private readonly username: string,
    private readonly phoneNumber: string,
    private accessCode: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly dateBirth: string,
    private accessToken: string,
    private refreshToken: string,
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

  public setAccessCode (value: string): void {
    this.accessCode = value;
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

  public getAccessToken (): string {
    return this.accessToken;
  }

  public setAccessToken (value: string): void {
    this.accessToken = value;
  }

  public getRefreshToken (): string {
    return this.refreshToken;
  }

  public setRefreshToken (value: string): void {
    this.refreshToken = value;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
