import { type PromotionEntity } from '../domain/promotion.domain';
import { type PromotionRepository } from '../promotion.repository';

export class PromotionStateRepository implements PromotionRepository {
  private readonly promotions: PromotionEntity[] = [];

  public async findOneByUuid (
    uuid: string
  ): Promise<PromotionEntity | undefined> {
    return this.promotions.find((promotion) => promotion.uuid === uuid);
  }

  public async findOneByDesignation (
    designation: string
  ): Promise<PromotionEntity | undefined> {
    return this.promotions.find((promotion) => promotion.designation === designation);
  }

  public async createOne (
    promotionEntity: PromotionEntity
  ): Promise<void> {
    this.promotions.push(promotionEntity);
  }

  public async updateOneByUuid (
    uuid: string,
    promotionEntity: Omit<PromotionEntity, 'uuid' | 'createdAt'>
  ): Promise<void> {
    this.promotions.find((promotion) => {
      if (promotion.uuid === uuid) {
        promotion = { ...promotion, ...promotionEntity }
      }

      return promotion;
    });
  }
}
