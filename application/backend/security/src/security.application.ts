import Express, { type Application } from 'express';
import { EnvironmentProvider } from './shared/providers/environment.provider';
import { SecurityGateway } from './security.gateway';

export class SecurityApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor() {
    this.application = Express();
    this.serverPort = EnvironmentProvider.getInstance().getServerPort();
  }

  public defineRoutes(): void {
    this.application.use('/security', new SecurityGateway().subscribeRouter())
  }

  public initializeListner(): void {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`)
    })
  }
}

const securityApplication = new SecurityApplication();

securityApplication.defineRoutes();
securityApplication.initializeListner();
