export class FindDevicesRequest {
  public constructor (
    private readonly userUuid: string | undefined,
    private readonly ipAddress: string | undefined,
    private readonly platform: string | undefined,
    private readonly model: string | undefined
  ) {}

  public getUserUuid (): string | undefined {
    return this.userUuid;
  }

  public getIpAddress (): string | undefined {
    return this.ipAddress;
  }

  public getPlatform (): string | undefined {
    return this.platform;
  }

  public getModel (): string | undefined {
    return this.model;
  }
}
