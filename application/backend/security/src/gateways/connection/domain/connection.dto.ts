export class ConnectionDTO {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly deviceUuid: string,
    private readonly ownershipUuid: string,
    private readonly locationUuid: string,
    private readonly accessToken: string,
    private readonly refreshToken: string,
    private readonly createdAt: string,
    private readonly updatedAt: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getUserUuid (): string {
    return this.userUuid;
  }

  public getDeviceUuid (): string {
    return this.deviceUuid;
  }

  public getOwnershipUuid (): string {
    return this.ownershipUuid;
  }

  public getLocationUuid (): string {
    return this.locationUuid;
  }

  public getAccessToken (): string {
    return this.accessToken;
  }

  public getRefreshToken (): string {
    return this.refreshToken;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
