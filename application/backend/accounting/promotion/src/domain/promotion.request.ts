import { type PromotionEntity } from './promotion.domain';

type FindPromotionByUuidRequest = Pick<PromotionEntity, 'uuid'>;
type CreatePromotionRequest = Readonly<Pick<PromotionEntity, 'designation' | 'description' | 'priceReduction'>>;
type UpdatePromotionByUuidRequest =
    Readonly<Pick<PromotionEntity, 'uuid'>> &
    Partial<Readonly<Omit<PromotionEntity, 'createdAt' | 'updatedAt'>>>;

export type {
  FindPromotionByUuidRequest,
  CreatePromotionRequest,
  UpdatePromotionByUuidRequest
}
