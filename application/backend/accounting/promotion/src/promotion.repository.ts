import { type PromotionEntity } from './domain/promotion.domain'

export interface PromotionRepository {
  findOneByUuid(
    uuid: string
  ): Promise<PromotionEntity | undefined>
  findOneByDesignation(
    designation: string
  ): Promise<PromotionEntity | undefined>
  createOne(
    promotionEntity: PromotionEntity
  ): Promise<void>
  updateOneByUuid(
    uuid: string,
    promotionEntity: Omit<PromotionEntity, 'uuid' | 'createdAt'>
  ): Promise<void>
}
