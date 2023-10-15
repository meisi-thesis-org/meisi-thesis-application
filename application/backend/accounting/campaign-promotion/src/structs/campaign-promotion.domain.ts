type CampaignPromotionEntity = {
  readonly uuid: string
  readonly campaignUuid: string
  readonly promotionUuid: string
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type CampaignPromotionDTO = Readonly<CampaignPromotionEntity>;
const campaignPromotionMapper = (entity: CampaignPromotionEntity): CampaignPromotionDTO => {
  return {
    uuid: entity.uuid,
    campaignUuid: entity.campaignUuid,
    promotionUuid: entity.promotionUuid,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}

export {
  type CampaignPromotionEntity,
  type CampaignPromotionDTO,
  campaignPromotionMapper
}
