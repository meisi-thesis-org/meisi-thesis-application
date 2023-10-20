import { type CampaignPromotionEntity } from './structs/campaign-promotion.domain';

export interface CampaignPromotionRepository {
  findOneByUuid(uuid: string): Promise<CampaignPromotionEntity | undefined>
  findBulkByForeignsUuid(
    campaignUuid: string | undefined,
    promotionUuid: string | undefined
  ): Promise<CampaignPromotionEntity[]>
  findOneByForeignsUuid(
    campaignUuid: string,
    promotionUuid: string
  ): Promise<CampaignPromotionEntity | undefined>
  createOne(
    campaignPromotionEntity: CampaignPromotionEntity
  ): Promise<void>
  updateOneByUuid(
    campaignPromotionEntity: CampaignPromotionEntity
  ): Promise<void>
}
