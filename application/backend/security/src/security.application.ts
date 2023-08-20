import Express, { type Application } from 'express';

export class SecurityApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000')
  }

  public defineListner (): void {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })
  }
}

new SecurityApplication().defineListner();
