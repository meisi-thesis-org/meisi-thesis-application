export class SecurityConfiguration {
  private static instance: SecurityConfiguration | null;

  public static getInstance(): SecurityConfiguration {
    if (this.instance === null) {
      this.instance = new SecurityConfiguration();
    }

    return this.instance;
  }
}
