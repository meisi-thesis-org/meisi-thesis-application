export class RefreshTokensRequest {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly username: string,
    private readonly email: string,
    private readonly phoneNumber: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getUserUuid (): string {
    return this.userUuid;
  }

  public getUsername (): string {
    return this.username;
  }

  public getEmail (): string {
    return this.email;
  }

  public getPhoneNumber (): string {
    return this.phoneNumber;
  }
}
