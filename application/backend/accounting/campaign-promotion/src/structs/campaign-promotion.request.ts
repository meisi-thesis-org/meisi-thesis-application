import { type CampaignPromotionEntity } from './campaign-promotion.domain'

type FindCampaignPromotionByUuidRequest = Readonly<Pick<CampaignPromotionEntity, 'uuid'>>
type FindCampaignPromotionsByForeignsUuidRequest = Readonly<Pick<CampaignPromotionEntity, 'campaignUuid' | 'promotionUuid'>>
type CreateCampaignPromotionRequest = Readonly<Pick<CampaignPromotionEntity, 'campaignUuid' | 'promotionUuid'>>
type UpdateCampaignPromotionByUuidRequest = Readonly<Pick<CampaignPromotionEntity, 'uuid' | 'active'>>

export type {
  FindCampaignPromotionByUuidRequest,
  FindCampaignPromotionsByForeignsUuidRequest,
  CreateCampaignPromotionRequest,
  UpdateCampaignPromotionByUuidRequest
}
