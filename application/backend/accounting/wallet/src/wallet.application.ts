import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { WalletGateway } from './wallet.gateway';

export class WalletApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8008')
  }

  public defineMiddlewares (): WalletApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): WalletApplication {
    this.application.use('/accounting/wallets', new WalletGateway().subscribe())

    return this;
  }

  public defineListner (): WalletApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new WalletApplication().defineMiddlewares().defineRoutes().defineListner();
