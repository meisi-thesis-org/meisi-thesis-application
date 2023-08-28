export class UpdateStatusByUuidRequest {
  public constructor (
    private readonly uuid: string,
    private readonly enabled: boolean
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getEnabled (): boolean {
    return this.enabled;
  }
}
