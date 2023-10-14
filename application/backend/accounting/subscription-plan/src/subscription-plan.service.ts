import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { subscriptionPlanMapper, type SubscriptionPlanDTO, type SubscriptionPlanEntity } from './domain/subscription-plan.domain';
import {
  type UpdateSubscriptionPlanByUuidRequest,
  type CreateSubscritionPlanRequest,
  type FindSubscritionPlanByUuidRequest
} from './domain/subscription-plan.request';
import { type SubscriptionPlanRepository } from './subscription-plan.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { SubscriptionPlanStateRepository } from './repositories/subscription-plan-state.repository';

export class SubscriptionPlanService {
  private readonly repository: SubscriptionPlanRepository = new SubscriptionPlanStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findBulk (): Promise<SubscriptionPlanDTO[]> {
    const foundSubscriptionPlans = await this.repository
      .findBulk()
      .catch(() => { throw new InternalServerException() });

    const subscritionPlansDTOs = new Array<SubscriptionPlanDTO>();

    for (const foundSubscriptionPlan of foundSubscriptionPlans) {
      subscritionPlansDTOs.push(subscriptionPlanMapper(foundSubscriptionPlan));
    }

    return subscritionPlansDTOs;
  }

  public async findOneByUuid ({ uuid }: FindSubscritionPlanByUuidRequest): Promise<SubscriptionPlanDTO> {
    const foundSubscriptionPlan = await this.repository
      .findOneByUuid(uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundSubscriptionPlan === undefined) throw new NonFoundException();

    return subscriptionPlanMapper(foundSubscriptionPlan);
  }

  public async createOne (args: CreateSubscritionPlanRequest): Promise<SubscriptionPlanDTO> {
    const foundSubscriptionPlan = await this.repository
      .findOneByDesignation(args.designation)
      .catch(() => { throw new InternalServerException() });

    if (foundSubscriptionPlan !== undefined) throw new ConflictException();

    const createdSubscriptionPlan: SubscriptionPlanEntity = {
      uuid: this.randomProvider.randomUUID(),
      designation: args.designation,
      description: args.description,
      price: args.price,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toString()
    }

    await this.repository
      .createOne(createdSubscriptionPlan)
      .catch(() => { throw new InternalServerException() });

    return subscriptionPlanMapper(createdSubscriptionPlan);
  }

  public async updateOneByUuid (args: UpdateSubscriptionPlanByUuidRequest): Promise<SubscriptionPlanDTO> {
    const foundSubscriptionPlan = await this.repository
      .findOneByUuid(args.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundSubscriptionPlan === undefined) throw new NonFoundException();

    const updatedSubscriptionPlan: SubscriptionPlanEntity = {
      uuid: foundSubscriptionPlan.uuid,
      designation: args.designation ?? foundSubscriptionPlan.designation,
      description: args.description ?? foundSubscriptionPlan.description,
      price: args.price ?? foundSubscriptionPlan.price,
      visible: args.visible ?? foundSubscriptionPlan.visible,
      active: args.active ?? foundSubscriptionPlan.active,
      createdAt: foundSubscriptionPlan.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(foundSubscriptionPlan.uuid, updatedSubscriptionPlan)
      .catch(() => { throw new InternalServerException() });

    return subscriptionPlanMapper(updatedSubscriptionPlan);
  }
}
