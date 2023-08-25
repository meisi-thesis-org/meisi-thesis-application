export class ConnectionEntity {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly deviceUuid: string,
    private readonly ownershipUuid: string,
    private readonly locationUuid: string,
    private accessToken: string,
    private refreshToken: string,
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

  public setAccessToken (value: string): void {
    this.accessToken = value;
  }

  public getRefreshToken (): string {
    return this.refreshToken;
  }

  public setRefreshToken (value: string): void {
    this.refreshToken = value;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
