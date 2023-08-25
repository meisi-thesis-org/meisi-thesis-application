export class UpdateLocationRequest {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly coordinateX: string,
    private readonly coordinateY: string
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
}
