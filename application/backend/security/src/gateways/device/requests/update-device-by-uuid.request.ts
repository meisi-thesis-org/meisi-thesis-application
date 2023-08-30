export class UpdateDeviceByUuidRequest {
  public constructor (
    private readonly uuid: string,
    private readonly ipAddress: string,
    private readonly platform: string,
    private readonly model: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getIpAddress (): string {
    return this.ipAddress
  }

  public getPlatform (): string {
    return this.platform
  }

  public getModel (): string {
    return this.model
  }
}
