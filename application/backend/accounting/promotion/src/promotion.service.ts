import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import {
  type UpdatePromotionByUuidRequest,
  type FindPromotionByUuidRequest,
  type CreatePromotionRequest
} from './domain/promotion.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type PromotionDTO, promotionMapper, type PromotionEntity } from './domain/promotion.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { PromotionStateRepository } from './repositories/promotion-state.repository';
import { type PromotionRepository } from './promotion.repository';

export class PromotionService {
  private readonly repository: PromotionRepository = new PromotionStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findOneByUuid (findPromotionByUuidRequest: FindPromotionByUuidRequest): Promise<PromotionDTO> {
    const foundPromotion = await this.repository
      .findOneByUuid(findPromotionByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundPromotion === undefined) throw new NonFoundException();

    return promotionMapper(foundPromotion);
  }

  public async createOne (createPromotionRequest: CreatePromotionRequest): Promise<PromotionDTO> {
    const foundPromotion = await this.repository
      .findOneByDesignation(createPromotionRequest.designation)
      .catch(() => { throw new InternalServerException() });

    if (foundPromotion !== undefined) throw new ConflictException();

    const createPromotion: PromotionEntity = {
      uuid: this.randomProvider.randomUUID(),
      designation: createPromotionRequest.designation,
      description: createPromotionRequest.description,
      priceReduction: createPromotionRequest.priceReduction,
      visible: true,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createPromotion)
      .catch(() => { throw new InternalServerException() });

    return promotionMapper(createPromotion);
  }

  public async updateOneByUuid (updatePromotionByUuidRequest: UpdatePromotionByUuidRequest): Promise<PromotionDTO> {
    const foundPromotion = await this.repository
      .findOneByUuid(updatePromotionByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundPromotion === undefined) throw new NonFoundException();

    const updatedPromotion: PromotionEntity = {
      uuid: foundPromotion.uuid,
      designation: updatePromotionByUuidRequest.designation ?? foundPromotion.designation,
      description: updatePromotionByUuidRequest.description ?? foundPromotion.description,
      priceReduction: updatePromotionByUuidRequest.priceReduction ?? foundPromotion.priceReduction,
      visible: updatePromotionByUuidRequest.visible ?? foundPromotion.visible,
      active: updatePromotionByUuidRequest.active ?? foundPromotion.active,
      createdAt: foundPromotion.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updatedPromotion.uuid, updatedPromotion)
      .catch(() => { throw new InternalServerException() });

    return promotionMapper(updatedPromotion);
  }
}
