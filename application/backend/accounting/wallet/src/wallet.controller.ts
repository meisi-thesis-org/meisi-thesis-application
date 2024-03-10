import { type Request, type Response } from 'express';
import { type FindWalletByUuidRequest, type CreateWalletRequest, type UpdateWalletByUuidRequest, type FindWalletByUserUuidRequest } from './structs/wallet.request';
import { WalletService } from './wallet.service';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';

export class WalletController {
  private readonly service = new WalletService();
  private readonly queueProvider = new QueueProvider();
  private readonly randomProvider = new RandomProvider();

  private async sendExceptionQueue (routeURL: string, exception: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({
        routeURL,
        correlationUuid: this.randomProvider.randomUUID(),
        exception
      }))
    ).catch(() => { throw new InternalServerException() });
  }

  public async findWalletByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindWalletByUuidRequest = {
        uuid: request.params.userUuid
      }
      const responseArgs = await this.service.findWalletByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::wallet::findWalletByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findWalletByUserUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindWalletByUserUuidRequest = {
        userUuid: String(request.query.userUuid) ?? undefined
      }
      const responseArgs = await this.service.findWalletByUserUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::wallet::findWalletByUserUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createWallet (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: CreateWalletRequest = {
        userUuid: request.body.userUuid
      }
      const responseArgs = await this.service.createWallet(requestArgs, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::wallet::createWallet', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateWalletByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: UpdateWalletByUuidRequest = {
        uuid: request.params.uuid,
        active: request.body.active,
        visible: request.body.visible,
        funds: request.body.funds
      }
      const responseArgs = await this.service.updateWalletByUuid(requestArgs);
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::wallet::updateWalletByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
