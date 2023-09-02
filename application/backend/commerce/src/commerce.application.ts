import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { CommerceGateway } from './commerce.gateway';

export class CommerceApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8003')
  }

  public defineMiddleware (): CommerceApplication {
    this.application.use(json());

    return this;
  }

  public defineRoutes (): CommerceApplication {
    this.application.use('/commerce', new CommerceGateway().subscribe())
    return this;
  }

  public defineListner (): CommerceApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new CommerceApplication().defineMiddleware().defineRoutes().defineListner();
