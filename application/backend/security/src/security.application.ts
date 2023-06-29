import Express, { type Application } from 'express';

export class SecurityApplication {
  private readonly application: Application = Express();
  private readonly serverPort: number = 8080;

  public defineListner(): SecurityApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`);
    })

    return this;
  }
}

new SecurityApplication().defineListner();
