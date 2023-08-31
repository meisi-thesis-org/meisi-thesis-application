export class DeviceEntity {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private ipAddress: string,
    private platform: string,
    private model: string,
    private enabled: boolean,
    private activated: boolean,
    private readonly createdAt: string,
    private updatedAt: string
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

  public setIpAddress (value: string): void {
    this.ipAddress = value
  }

  public getPlatform (): string {
    return this.platform;
  }

  public setPlatform (value: string): void {
    this.platform = value
  }

  public getModel (): string {
    return this.model;
  }

  public setModel (value: string): void {
    this.model = value
  }

  public getEnabled (): boolean {
    return this.enabled;
  }

  public setEnabled (value: boolean): void {
    this.enabled = value
  }

  public getActivated (): boolean {
    return this.activated;
  }

  public setActivated (value: boolean): void {
    this.activated = value
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }

  public setUpdatedAt (value: string): void {
    this.updatedAt = value
  }
}
