import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { SecurityGateway } from './security.gateway';

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

  public defineRoutes (): SecurityApplication {
    this.application.use('/security', new SecurityGateway().subscribe())
    return this;
  }

  public defineListner (): SecurityApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new SecurityApplication().defineMiddleware().defineRoutes().defineListner();
