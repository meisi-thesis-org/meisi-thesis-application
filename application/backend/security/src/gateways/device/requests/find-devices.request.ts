export class FindDevicesRequest {
  public constructor (
    private readonly userUuid: string,
    private readonly ipAddress: string,
    private readonly platform: string,
    private readonly model: string
  ) {}

  public getUserUuid (): string {
    return this.userUuid;
  }

  public getIpAddress (): string {
    return this.ipAddress;
  }

  public getPlatform (): string {
    return this.platform;
  }

  public getModel (): string {
    return this.model;
  }
}
