import { type CampaignPromotionRepository } from '../campaign-promotion.repository';
import { type CampaignPromotionEntity } from '../structs/campaign-promotion.domain';

export class CampaignPromotionStateRepository implements CampaignPromotionRepository {
  private readonly campaignPromotions = new Array<CampaignPromotionEntity>();

  public async findOneByUuid (
    uuid: string
  ): Promise<CampaignPromotionEntity | undefined> {
    return this.campaignPromotions.find((campaignPromotion) => campaignPromotion.uuid === uuid && campaignPromotion.active)
  }

  public async findBulkByForeignsUuid (
    campaignUuid: string | undefined,
    promotionUuid: string | undefined
  ): Promise<CampaignPromotionEntity[]> {
    if (campaignUuid !== undefined && promotionUuid !== undefined) {
      return this.campaignPromotions.filter((campaignPromotion) =>
        campaignPromotion.campaignUuid === campaignUuid &&
        campaignPromotion.promotionUuid === promotionUuid &&
        campaignPromotion.active
      )
    }

    if (campaignUuid !== undefined && promotionUuid === undefined) {
      return this.campaignPromotions.filter((campaignPromotion) =>
        campaignPromotion.campaignUuid === campaignUuid &&
        campaignPromotion.active
      )
    }

    if (campaignUuid === undefined && promotionUuid !== undefined) {
      return this.campaignPromotions.filter((campaignPromotion) =>
        campaignPromotion.promotionUuid === promotionUuid &&
        campaignPromotion.active
      )
    }

    return []
  }

  public async findOneByForeignsUuid (
    campaignUuid: string,
    promotionUuid: string
  ): Promise<CampaignPromotionEntity | undefined> {
    return this.campaignPromotions.find((campaignPromotion) =>
      campaignPromotion.campaignUuid === campaignUuid &&
    campaignPromotion.promotionUuid === promotionUuid &&
    campaignPromotion.active
    )
  }

  public async createOne (campaignPromotionEntity: CampaignPromotionEntity): Promise<void> {
    this.campaignPromotions.push(campaignPromotionEntity)
  }

  public async updateOneByUuid (campaignPromotionEntity: CampaignPromotionEntity): Promise<void> {
    this.campaignPromotions.find((campaignPromotion) => {
      if (campaignPromotion.uuid === campaignPromotionEntity.uuid) {
        campaignPromotion = { ...campaignPromotion, ...campaignPromotionEntity }
      }

      return campaignPromotion
    })
  }
}
