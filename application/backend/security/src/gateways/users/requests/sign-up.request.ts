export class SignUpRequest {
  public constructor(
    private readonly username: string,
    private readonly email: string,
    private readonly phoneNumber: string
  ) {}

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }
}
