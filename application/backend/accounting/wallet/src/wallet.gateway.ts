import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { WalletController } from './wallet.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateWalletSchema, FindWalletByUserUuidSchema, FindWalletByUuidSchema, UpdateWalletByUuidSchema } from './structs/wallet.schema';

export class WalletGateway extends Gateway<Router> {
  private readonly controller: WalletController = new WalletController();

  public constructor () {
    super(Router())
  }

  public subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindWalletByUuidSchema), async (request: Request, response: Response) => await this.controller.findWalletByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateWalletByUuidSchema), async (request: Request, response: Response) => await this.controller.updateWalletByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateWalletSchema), async (request: Request, response: Response) => await this.controller.createWallet(request, response))
    this.router.get('/', SchemaValidator(FindWalletByUserUuidSchema), async (request: Request, response: Response) => await this.controller.findWalletByUserUuid(request, response))

    return this.router;
  }
}
