import Express, { type Application } from 'express';
import { EnvironmentProvider } from './shared/providers/environment.provider';
import { AccountingRouter } from './accounting.router';

export class AccountingApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor() {
    this.application = Express();
    this.serverPort = EnvironmentProvider.getInstance().getServerPort();
  }

  public defineRoutes(): void {
    this.application.use('*', new AccountingRouter().subscribeRouter())
  }

  public initializeListner(): void {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`)
    })
  }
}

const accountingApplication = new AccountingApplication();

accountingApplication.defineRoutes();
accountingApplication.initializeListner();
