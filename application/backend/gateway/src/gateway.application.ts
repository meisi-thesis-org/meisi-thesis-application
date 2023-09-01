import Express, { type Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { checkAccessTokenMiddleware } from './middlewares/check-access-token.middleware';
import 'dotenv/config';

export class GatewayApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000')
  }

  public defineRoutes (): GatewayApplication {
    const availableHosts = new Map<string, string>();
    availableHosts.set('/security', 'http://localhost:8003');
    availableHosts.set('/commerce', 'http://localhost:8004');
    availableHosts.set('/accounting', 'http://localhost:8005');

    for (const [key, value] of availableHosts.entries()) {
      this.application.use(key, checkAccessTokenMiddleware, createProxyMiddleware({ target: value, changeOrigin: true }))
    }

    return this;
  }

  public defineListner (): GatewayApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new GatewayApplication().defineRoutes().defineListner();
