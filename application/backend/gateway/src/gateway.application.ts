import Express, { type Application } from 'express';
import 'dotenv/config';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class GatewayApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000')
  }

  public defineRoutes (): GatewayApplication {
    this.application.use('/security', createProxyMiddleware({ target: 'http://localhost:8003', changeOrigin: true }));
    this.application.use('/commerce', createProxyMiddleware({ target: 'http://localhost:8004', changeOrigin: true }));
    this.application.use('/accounting', createProxyMiddleware({ target: 'http://localhost:8005', changeOrigin: true }));

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
