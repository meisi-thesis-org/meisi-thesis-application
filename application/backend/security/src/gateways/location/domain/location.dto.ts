export class LocationDTO {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly coordinateX: string,
    private readonly coordinateY: string,
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

  public getCoordinateX (): string {
    return this.coordinateX;
  }

  public getCoordinateY (): string {
    return this.coordinateY;
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
