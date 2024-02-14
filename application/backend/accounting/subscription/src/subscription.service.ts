import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { subscriptionMapper, type SubscriptionDTO, type SubscriptionEntity } from './structs/subscription.domain';
import { type UpdateSubscriptionByUuidRequest, type CreateSubscriptionRequest, type FindSubscriptionByUuidRequest, type FindSubscriptionsByForeignsUuidRequest } from './structs/subscription.request';
import { type SubscriptionRepository } from './subscription.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { BadRequestException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/bad-request.exception';
import { SubscriptionStateRepository } from './repositories/subscription-state.repository';

export class SubscriptionService {
  private readonly repository: SubscriptionRepository = new SubscriptionStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findSubscriptionByUuid (requestArgs: FindSubscriptionByUuidRequest): Promise<SubscriptionDTO> {
    const foundEntity = await this.repository
      .findSubscriptionByUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    return subscriptionMapper(foundEntity)
  }

  public async findSubscriptionsByForeignsUuid (requestArgs: FindSubscriptionsByForeignsUuidRequest): Promise<SubscriptionDTO[]> {
    const foundEntities = await this.repository
      .findSubscriptionsByForeignsUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntities?.length === 0) throw new NonFoundException();

    return foundEntities.filter((foundEntity) => subscriptionMapper(foundEntity))
  }

  public async createSubscription (
    requestArgs: CreateSubscriptionRequest,
    requestOptions?: Record<string, string>
  ): Promise<SubscriptionDTO> {
    const foundEntities = await this.repository
      .findSubscriptionsByForeignsUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntities?.length > 0) throw new ConflictException();

    let removeAmount = 0;

    const existenceCalls = [];
    existenceCalls.push({ condition: requestArgs.dossierUuid, path: 'commerce/dossiers', method: 'GET', args: { uuid: requestArgs.dossierUuid } })
    existenceCalls.push({ condition: requestArgs.bookUuid, path: 'commerce/books', method: 'GET', args: { uuid: requestArgs.bookUuid } })
    existenceCalls.push({ condition: requestArgs.chapterUuid, path: 'commerce/chapters', method: 'GET', args: { uuid: requestArgs.chapterUuid } })
    existenceCalls.push({ condition: requestArgs.pageUuid, path: 'commerce/pages', method: 'GET', args: { uuid: requestArgs.pageUuid } })

    for (const existenceCall of existenceCalls) {
      console.log(existenceCall.condition)
      if (existenceCall.condition !== undefined) {
        const responseArgs = await this.networkProvider
          .doHttpRequest(
            '8000',
            existenceCall.path,
            existenceCall.method as 'POST' | 'GET' | 'POST',
            { authorization: requestOptions?.authorization ?? '' },
            existenceCall.args as unknown as Record<string, string>
          ).catch((error) => { throw error }) as { price: number, active: boolean, visible: boolean }

        if (!responseArgs.active || !responseArgs.visible) throw new BadRequestException();

        removeAmount += responseArgs.price;
      }
    }

    await this.networkProvider.doHttpRequest(
      '8000',
      `accounting/wallets/${requestArgs.walletUuid}`,
      'PUT',
      { authorization: requestOptions?.authorization ?? '' },
      undefined,
      { funds: removeAmount }
    ).catch((error) => { throw error }) as Record<string, string | boolean | number>

    const createdEntity: SubscriptionEntity = {
      uuid: this.randomProvider.randomUUID(),
      walletUuid: requestArgs.walletUuid,
      dossierUuid: requestArgs.dossierUuid,
      bookUuid: requestArgs.bookUuid,
      chapterUuid: requestArgs.chapterUuid,
      pageUuid: requestArgs.pageUuid,
      active: true,
      visible: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.createSubscription(createdEntity).catch(() => {
      throw new InternalServerException();
    })

    return subscriptionMapper(createdEntity);
  }

  public async updateSubscriptionByUuid (requestArgs: UpdateSubscriptionByUuidRequest): Promise<SubscriptionDTO> {
    const foundEntity = await this.repository
      .findSubscriptionByUuid({ uuid: requestArgs.uuid })
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    const updatedEntity: SubscriptionEntity = {
      uuid: foundEntity.uuid,
      walletUuid: foundEntity.walletUuid,
      dossierUuid: foundEntity.dossierUuid,
      bookUuid: foundEntity.bookUuid,
      chapterUuid: foundEntity.chapterUuid,
      pageUuid: foundEntity.pageUuid,
      active: requestArgs.active ?? foundEntity.active,
      visible: requestArgs.visible ?? foundEntity.visible,
      createdAt: foundEntity.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.updateSubscriptionByUuid(updatedEntity).catch(() => {
      throw new InternalServerException();
    })

    return subscriptionMapper(updatedEntity);
  }
}
