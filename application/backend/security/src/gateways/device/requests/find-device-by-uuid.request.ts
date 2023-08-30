export class FindDeviceByUuidRequest {
  public constructor (
    private readonly uuid: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }
}
