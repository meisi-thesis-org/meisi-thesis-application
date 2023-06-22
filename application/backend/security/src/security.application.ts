import Express, { json, type Application } from 'express';
import { SecurityGateway } from './security.gateway';

export class SecurityApplication {
  private readonly application: Application = Express();
  private readonly serverPort: number = 8080;

  public initializeConfigurations(): SecurityApplication {
    this.application.use(json());

    return this;
  }

  public initializeGateway(): SecurityApplication {
    this.application.all('*', new SecurityGateway().subscribe());
    return this;
  }

  public initializeListner(): SecurityApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`);
    });

    return this
  }
}

new SecurityApplication()
  .initializeConfigurations()
  .initializeGateway()
  .initializeListner();
