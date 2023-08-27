export class UpdateCoordinatesByUuidRequest {
  public constructor (
    private readonly uuid: string,
    private readonly coordinatesX: string,
    private readonly coordinatesY: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getCoordinatesX (): string {
    return this.coordinatesX;
  }

  public getCoordinatesY (): string {
    return this.coordinatesY;
  }
}
