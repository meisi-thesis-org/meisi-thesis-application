export class LocationDTO {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly coordinateX: string,
    private readonly coordinateY: string,
    private readonly enabled: boolean,
    private readonly deactivated: boolean,
    private readonly createdAt: string,
    private readonly updatedAt: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getUserUuid (): string {
    return this.userUuid;
  }

  public getCoordinateX (): string {
    return this.coordinateX;
  }

  public getCoordinateY (): string {
    return this.coordinateY;
  }

  public getEnabled (): boolean {
    return this.enabled;
  }

  public getDeactivated (): boolean {
    return this.deactivated;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
