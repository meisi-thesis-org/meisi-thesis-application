import { type CampaignPromotionEntity } from './structs/campaign-promotion.domain';

export interface CampaignPromotionRepository {
  findOneByUuid(
    entity: Pick<CampaignPromotionEntity, 'uuid'>
  ): Promise<CampaignPromotionEntity | undefined>
  findBulkByForeignsUuid(
    entity: Partial<Pick<CampaignPromotionEntity, 'promotionUuid' | 'campaignUuid'>>
  ): Promise<CampaignPromotionEntity[]>
  createOne(
    entity: CampaignPromotionEntity
  ): Promise<void>
  updateOneByUuid(
    entity: Pick<CampaignPromotionEntity, 'uuid' | 'active'>
  ): Promise<void>
}
