export class DeviceDTO {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly ipAddress: string,
    private readonly platform: string,
    private readonly model: string,
    private readonly enabled: boolean,
    private readonly activated: boolean,
    private readonly createdAt: string,
    private readonly updatedAt: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

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

  public getEnabled (): boolean {
    return this.enabled;
  }

  public getActivated (): boolean {
    return this.activated;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
