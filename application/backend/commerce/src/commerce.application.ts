import Express, { type Application } from 'express';
import { EnvironmentProvider } from './shared/providers/environment.provider';
import { CommerceRouter } from './commerce.router';

export class CommerceApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor() {
    this.application = Express();
    this.serverPort = EnvironmentProvider.getInstance().getServerPort();
  }

  public defineRoutes(): void {
    this.application.use('*', new CommerceRouter().subscribeRouter())
  }

  public initializeListner(): void {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`)
    })
  }
}

const commerceApplication = new CommerceApplication();

commerceApplication.defineRoutes();
commerceApplication.initializeListner();
