export class RefreshAccessCodeRequest {
  public constructor(
    private readonly username: string | null,
    private readonly email: string | null,
    private readonly phoneNumber: string | null
  ) {}

  public getUsername(): string | null {
    return this.username;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public getPhoneNumber(): string | null {
    return this.phoneNumber;
  }
}
