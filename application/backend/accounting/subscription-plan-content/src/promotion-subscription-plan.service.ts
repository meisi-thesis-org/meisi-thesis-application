import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import {
  type UpdatePromotionSubscriptionPlanByUuidRequest,
  type FindPromotionSubscriptionPlanByUuidRequest,
  type CreatePromotionSubscriptionPlanRequest,
  type FindPromotionSubscriptionPlansByForeignsUuidRequest
} from './structs/subscription-plan-content.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type PromotionSubscriptionPlanDTO, promotionSubscriptionPlanMapper, type PromotionSubscriptionPlanEntity } from './structs/subscription-plan-content.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PromotionSubscriptionPlanStateRepository } from './repositories/promotion-subscription-plan-state.repository';
import { type PromotionSubscriptionPlanRepository } from './promotion-subscription-plan.repository';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';

export class PromotionSubscriptionPlanService {
  private readonly repository: PromotionSubscriptionPlanRepository = new PromotionSubscriptionPlanStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findOneByUuid (
    findPromotionSubscriptionPlanByUuidRequest: FindPromotionSubscriptionPlanByUuidRequest
  ): Promise<PromotionSubscriptionPlanDTO> {
    const foundPromotionSubscriptionPlan = await this.repository
      .findOneByUuid(findPromotionSubscriptionPlanByUuidRequest)
      .catch(() => { throw new InternalServerException() });

    if (foundPromotionSubscriptionPlan === undefined) throw new NonFoundException();

    return promotionSubscriptionPlanMapper(foundPromotionSubscriptionPlan);
  }

  public async findBulkByForeignsUuid (
    findPromotionSubscriptionPlanByUuidRequest: FindPromotionSubscriptionPlansByForeignsUuidRequest
  ): Promise<PromotionSubscriptionPlanDTO[]> {
    const foundPromotionSubscriptionPlans = await this.repository
      .findBulkByForeignsUuid(findPromotionSubscriptionPlanByUuidRequest)
      .catch(() => { throw new InternalServerException() });

    return foundPromotionSubscriptionPlans.filter((foundPromotionSubscriptionPlan) => promotionSubscriptionPlanMapper(foundPromotionSubscriptionPlan));
  }

  public async createOne (createPromotionSubscriptionPlanRequest: CreatePromotionSubscriptionPlanRequest): Promise<PromotionSubscriptionPlanDTO> {
    await this.networkProvider.doHttpRequest(
      '8000',
      'accounting/promotions',
      'GET',
      undefined,
      { promotionUuid: createPromotionSubscriptionPlanRequest.promotionUuid }
    )

    await this.networkProvider.doHttpRequest(
      '8000',
      'accounting/subscription-plans',
      'GET',
      undefined,
      { subscriptionPlanUuid: createPromotionSubscriptionPlanRequest.subscriptionPlanUuid }
    )

    const createPromotionSubscriptionPlan: PromotionSubscriptionPlanEntity = {
      uuid: this.randomProvider.randomUUID(),
      promotionUuid: createPromotionSubscriptionPlanRequest.promotionUuid,
      subscriptionPlanUuid: createPromotionSubscriptionPlanRequest.subscriptionPlanUuid,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createPromotionSubscriptionPlan)
      .catch(() => { throw new InternalServerException() });

    return promotionSubscriptionPlanMapper(createPromotionSubscriptionPlan);
  }

  public async updateOneByUuid (updatePromotionSubscriptionPlanByUuidRequest: UpdatePromotionSubscriptionPlanByUuidRequest): Promise<PromotionSubscriptionPlanDTO> {
    const foundPromotionSubscriptionPlan = await this.repository
      .findOneByUuid(updatePromotionSubscriptionPlanByUuidRequest)
      .catch(() => { throw new InternalServerException() });

    if (foundPromotionSubscriptionPlan === undefined) throw new NonFoundException();

    const updatedPromotionSubscriptionPlan: PromotionSubscriptionPlanEntity = {
      uuid: foundPromotionSubscriptionPlan.uuid,
      promotionUuid: foundPromotionSubscriptionPlan.promotionUuid,
      subscriptionPlanUuid: foundPromotionSubscriptionPlan.subscriptionPlanUuid,
      active: updatePromotionSubscriptionPlanByUuidRequest.active ?? foundPromotionSubscriptionPlan.active,
      createdAt: foundPromotionSubscriptionPlan.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updatedPromotionSubscriptionPlan)
      .catch(() => { throw new InternalServerException() });

    return promotionSubscriptionPlanMapper(updatedPromotionSubscriptionPlan);
  }
}
