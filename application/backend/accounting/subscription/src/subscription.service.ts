import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import {
  type UpdateSubscriptionByUuidRequest,
  type FindSubscriptionByUuidRequest,
  type CreateSubscriptionRequest
} from './domain/subscription.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type SubscriptionDTO, subscriptionMapper, type SubscriptionEntity } from './domain/subscription.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { SubscriptionStateRepository } from './repositories/subscription-state.repository';
import { type SubscriptionRepository } from './subscription.repository';

export class SubscriptionService {
  private readonly repository: SubscriptionRepository = new SubscriptionStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findOneByUuid (findSubscriptionByUuidRequest: FindSubscriptionByUuidRequest): Promise<SubscriptionDTO> {
    const foundSubscription = await this.repository
      .findOneByUuid(findSubscriptionByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundSubscription === undefined) throw new NonFoundException();

    return subscriptionMapper(foundSubscription);
  }

  public async createOne (createSubscriptionRequest: CreateSubscriptionRequest): Promise<SubscriptionDTO> {
    const foundSubscription = await this.repository
      .findOneByUserSubscriptionPlan(createSubscriptionRequest)
      .catch(() => { throw new InternalServerException() });

    if (foundSubscription !== undefined) throw new ConflictException();

    const createSubscription: SubscriptionEntity = {
      uuid: this.randomProvider.randomUUID(),
      userUuid: createSubscriptionRequest.userUuid,
      subscriptionPlanUuid: createSubscriptionRequest.subscriptionPlanUuid,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createSubscription)
      .catch(() => { throw new InternalServerException() });

    return subscriptionMapper(createSubscription);
  }

  public async updateOneByUuid (updateSubscriptionByUuidRequest: UpdateSubscriptionByUuidRequest): Promise<SubscriptionDTO> {
    const foundSubscription = await this.repository
      .findOneByUuid(updateSubscriptionByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundSubscription === undefined) throw new NonFoundException();

    const updatedSubscription: SubscriptionEntity = {
      uuid: foundSubscription.uuid,
      userUuid: foundSubscription.userUuid,
      subscriptionPlanUuid: foundSubscription.subscriptionPlanUuid,
      active: updateSubscriptionByUuidRequest.active ?? foundSubscription.active,
      createdAt: foundSubscription.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updatedSubscription.uuid, updatedSubscription)
      .catch(() => { throw new InternalServerException() });

    return subscriptionMapper(updatedSubscription);
  }
}
