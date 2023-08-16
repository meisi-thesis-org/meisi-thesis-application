export class RecoverAccessCodeRequest {
  public constructor (
    private readonly username: string | undefined,
    private readonly email: string | undefined,
    private readonly phoneNumber: string | undefined
  ) {}

  public getUsername (): string | undefined {
    return this.username;
  }

  public getEmail (): string | undefined {
    return this.email;
  }

  public getPhoneNumber (): string | undefined {
    return this.phoneNumber;
  }
}
