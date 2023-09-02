export class DossierEntity {
  public constructor (
    private readonly uuid: string,
    private readonly userUuid: string,
    private readonly description: string,
    private readonly createdAt: string,
    private readonly updatedAt: string
  ) {}

  public getUuid (): string {
    return this.uuid;
  }

  public getUserUuid (): string {
    return this.userUuid;
  }

  public getDescription (): string {
    return this.description;
  }

  public getCreatedAt (): string {
    return this.createdAt;
  }

  public getUpdatedAt (): string {
    return this.updatedAt;
  }
}
