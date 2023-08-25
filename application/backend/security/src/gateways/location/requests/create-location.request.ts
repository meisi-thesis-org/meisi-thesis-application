export class CreateLocationRequest {
  public constructor (
    private readonly userUuid: string,
    private readonly coordinateX: string,
    private readonly coordinateY: string
  ) {}

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
