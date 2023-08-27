export class LocationEntity {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private coordinateX: string,
    private coordinateY: string,
    private enabled: boolean,
    private deactivated: boolean,
    private readonly createdAt: string,
    private updatedAt: string
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

  public setCoordinateX (value: string): void {
    this.coordinateX = value;
  }

  public getCoordinateY (): string {
    return this.coordinateY;
  }

  public setCoordinateY (value: string): void {
    this.coordinateY = value;
  }

  public getEnabled (): boolean {
    return this.enabled;
  }

  public setEnabled (value: boolean): void {
    this.enabled = value;
  }

  public getDeactivated (): boolean {
    return this.deactivated;
  }

  public setDeactivated (value: boolean): void {
    this.deactivated = value;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }

  public setUpdatedAt (value: string): void {
    this.updatedAt = value;
  }
}
