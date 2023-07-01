import Express, { json, type Application, urlencoded } from 'express';
import { SecurityGateway } from './security.gateway';
import 'dotenv/config';

export class SecurityApplication {
  private readonly application: Application = Express();
  private readonly serverPort: number = 8080;

  public defineMiddleware(): SecurityApplication {
    this.application.use(urlencoded({ extended: true }))
    this.application.use(json())

    return this;
  }

  public defineGateway(): SecurityApplication {
    this.application.all('*', new SecurityGateway().subscribe());

    return this;
  }

  public defineListner(): SecurityApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`);
    })

    return this;
  }
}

new SecurityApplication().defineMiddleware().defineGateway().defineListner();
