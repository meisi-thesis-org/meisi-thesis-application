export class FindLocationsRequest {
  public constructor (
    private readonly userUuid: string | undefined,
    private readonly coordinateX: string | undefined,
    private readonly coordinateY: string | undefined
  ) {}

  public getUserUuid (): string | undefined {
    return this.userUuid;
  }

  public getCoordinateX (): string | undefined {
    return this.coordinateX;
  }

  public getCoordinateY (): string | undefined {
    return this.coordinateY;
  }
}
