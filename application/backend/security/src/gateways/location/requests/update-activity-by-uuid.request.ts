export class UpdateActivityByUuidRequest {
  public constructor (
    private readonly uuid: string,
    private readonly activated: boolean
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getActivated (): boolean {
    return this.activated;
  }
}
