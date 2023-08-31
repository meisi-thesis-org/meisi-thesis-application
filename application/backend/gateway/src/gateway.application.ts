import Express, { type Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'dotenv/config';

export class GatewayApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000')
  }

  public defineRoutes (): GatewayApplication {
    this.application.use('/security', createProxyMiddleware({ target: 'http://localhost:8003', changeOrigin: true }));

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
