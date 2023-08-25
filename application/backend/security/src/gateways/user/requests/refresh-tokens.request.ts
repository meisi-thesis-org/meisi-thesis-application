export class RefreshTokensRequest {
  public constructor (
    private readonly uuid: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }
}
