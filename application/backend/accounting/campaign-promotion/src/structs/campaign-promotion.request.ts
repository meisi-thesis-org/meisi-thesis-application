import { type CampaignPromotionEntity } from './campaign-promotion.domain';

type FindCampaignPromotionByUuidRequest = Pick<CampaignPromotionEntity, 'uuid'>;
type FindCampaignPromotionsByForeignsUuidRequest = Pick<CampaignPromotionEntity, 'campaignUuid' | 'promotionUuid'>;
type CreateCampaignPromotionRequest = Pick<CampaignPromotionEntity, 'campaignUuid' | 'promotionUuid'>;
type UpdateCampaignPromotionByUuidRequest =
  Pick<CampaignPromotionEntity, 'uuid'> &
  Partial<Pick<CampaignPromotionEntity, 'active'>>;

export type {
  FindCampaignPromotionByUuidRequest,
  FindCampaignPromotionsByForeignsUuidRequest,
  CreateCampaignPromotionRequest,
  UpdateCampaignPromotionByUuidRequest
}
