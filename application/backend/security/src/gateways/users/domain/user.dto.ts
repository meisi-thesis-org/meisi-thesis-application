export class UserDTO {
  public constructor(
    private readonly uuid: string,
    private readonly username: string,
    private readonly email: string,
    private readonly phoneNumber: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly dateBirth: Date,
    private readonly accessToken: string | null,
    private readonly refreshToken: string | null,
    private readonly blocked: boolean,
    private readonly deactivated: boolean,
    private readonly acceptedPrivacyTerms: boolean,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

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
