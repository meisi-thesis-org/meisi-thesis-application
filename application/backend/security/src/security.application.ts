import Express, { json, type Application } from 'express';
import 'dotenv/config';

export class SecurityApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000')
  }

  public defineMiddleware (): SecurityApplication {
    this.application.use(json());

    return this;
  }

  public defineListner (): SecurityApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new SecurityApplication().defineMiddleware().defineListner();
