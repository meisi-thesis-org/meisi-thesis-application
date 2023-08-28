export class LocationEntity {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private coordinateX: string,
    private coordinateY: string,
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

  public getActivated (): boolean {
    return this.activated;
  }

  public setActivated (value: boolean): void {
    this.activated = value;
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
