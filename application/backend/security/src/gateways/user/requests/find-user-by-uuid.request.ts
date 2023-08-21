export class FindUserByUuidRequest {
  public constructor (
    private readonly uuid: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }
}
