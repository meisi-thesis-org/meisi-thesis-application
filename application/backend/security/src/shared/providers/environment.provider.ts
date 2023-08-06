import 'dotenv/config';

export class EnvironmentProvider {
  public static instance: EnvironmentProvider | null = null;

  private constructor() {}

  public static getInstance(): EnvironmentProvider {
    if (this.instance === null) {
      this.instance = new EnvironmentProvider();
    }

    return this.instance;
  }

  public getServerPort(): number {
    return parseInt(process.env.SERVER_PORT ?? '3001');
  }
}
