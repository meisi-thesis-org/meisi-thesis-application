import Express, { type Application, type Request, type Response } from 'express';
import 'dotenv/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { GatewayController } from './gateway.controller';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { SignInSchema } from './domain/session.schema';
import { type AuthenticatedRequest } from '@meisi-thesis/application-backend-utilities-shared/src/types/authenticated-request.type';
import cors from 'cors';

export class GatewayApplication {
  private readonly application: Application;
  private readonly serverPort: number;
  private readonly gatewayController = new GatewayController();

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000');
    this.application.use(cors())
  }

  public defineRoutes (): void {
    this.application.use('/security/users', createProxyMiddleware({ target: 'http://user_app:8001', changeOrigin: true, secure: false }));
    this.application.put('/session/sign-in/:userUuid', SchemaValidator(SignInSchema), async (request: Request, response: Response) => await this.gatewayController.signIn(request, response));
    this.application.put('/session/sign-out', AccessTokenGuard, async (request: Request, response: Response) => await this.gatewayController.signOut(request as AuthenticatedRequest, response));
    this.application.put('/session/refresh-tokens', RefreshTokenGuard, async (request: Request, response: Response) => await this.gatewayController.refreshTokens(request as AuthenticatedRequest, response));

    const availableHosts = new Map<string, string>();
    availableHosts.set('/security/users/:uuid', 'http://user_app:8001');
    availableHosts.set('/security/devices', 'http://device_app:8002');
    availableHosts.set('/security/networks', 'http://network_app:8003');
    availableHosts.set('/commerce/dossiers', 'http://dossier_app:8004');
    availableHosts.set('/commerce/books', 'http://book_app:8005');
    availableHosts.set('/commerce/chapters', 'http://chapter_app:8006');
    availableHosts.set('/commerce/pages', 'http://page_app:8007');
    availableHosts.set('/accounting/wallets', 'http://wallet_app:8008');
    availableHosts.set('/accounting/subscriptions', 'http://subscription_app:8009');

    for (const [key, value] of availableHosts.entries()) {
      this.application.use(key, AccessTokenGuard, createProxyMiddleware({ target: value, changeOrigin: true, secure: false }))
    }
  }

  public defineListner (): void {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })
  }
}

const gatewayApplication = new GatewayApplication()
gatewayApplication.defineRoutes();
gatewayApplication.defineListner();
