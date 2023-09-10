import Express, { json, type Application, type Request, type Response } from 'express';
import 'dotenv/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { GatewayController } from './gateway.controller';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { SignInSchema } from './domain/session.schema';
import { type AuthenticatedRequest } from '@meisi-thesis/application-backend-utilities-shared/src/types/authenticated-request.type';

export class GatewayApplication {
  private readonly application: Application;
  private readonly serverPort: number;
  private readonly gatewayController = new GatewayController();

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000')
  }

  public defineMiddlewares (): void {
    this.application.use(json());
  }

  public defineRoutes (): void {
    /** Proxy */
    this.application.use('/security/users', createProxyMiddleware({ target: 'http://localhost:8001/security/users', changeOrigin: true }));
    this.application.use('/security/devices', AccessTokenGuard, createProxyMiddleware({ target: 'http://localhost:8002/security/devices', changeOrigin: true }));
    this.application.use('/security/locations', AccessTokenGuard, createProxyMiddleware({ target: 'http://localhost:8003/security/locations', changeOrigin: true }));
    this.application.use('/commerce/dossiers', AccessTokenGuard, createProxyMiddleware({ target: 'http://localhost:8004/commerce/dossiers', changeOrigin: true }));
    this.application.use('/commerce/books', AccessTokenGuard, createProxyMiddleware({ target: 'http://localhost:8005/commerce/books', changeOrigin: true }));
    this.application.use('/commerce/chapters', AccessTokenGuard, createProxyMiddleware({ target: 'http://localhost:8006/commerce/chapters', changeOrigin: true }));

    this.application.put('/session/sign-in', SchemaValidator(SignInSchema), async (request: Request, response: Response) => await this.gatewayController.signIn(request, response))
    this.application.put('/session/sign-out', AccessTokenGuard, async (request: Request, response: Response) => await this.gatewayController.signOut(request as AuthenticatedRequest, response))
    this.application.put('/session/refresh-tokens', RefreshTokenGuard, async (request: Request, response: Response) => await this.gatewayController.refreshTokens(request as AuthenticatedRequest, response))
  }

  public defineListner (): void {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })
  }
}

const gatewayApplication = new GatewayApplication()
gatewayApplication.defineMiddlewares();
gatewayApplication.defineRoutes();
gatewayApplication.defineListner();
