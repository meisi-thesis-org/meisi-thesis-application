export class CreateDossierRequest {
  public constructor (
    private readonly userUuid: string,
    private readonly description: string
  ) {}

  public getUserUuid (): string {
    return this.userUuid;
  }

  public getDescription (): string {
    return this.description;
  }
}
