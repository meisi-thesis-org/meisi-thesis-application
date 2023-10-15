import { type CampaignPromotionRepository } from '../campaign-promotion.repository';
import { type CampaignPromotionEntity } from '../structs/campaign-promotion.domain';

export class CampaignPromotionStateRepository implements CampaignPromotionRepository {
  private readonly campaignPromotions = new Array<CampaignPromotionEntity>();

  public async findOneByUuid (
    entity: Pick<CampaignPromotionEntity, 'uuid'>
  ): Promise<CampaignPromotionEntity | undefined> {
    return this.campaignPromotions.find((campaignPromotion) => campaignPromotion.uuid === entity.uuid);
  }

  public async findBulkByForeignsUuid (
    entity: Partial<Pick<CampaignPromotionEntity, 'promotionUuid' | 'campaignUuid'>>
  ): Promise<CampaignPromotionEntity[]> {
    if (entity.campaignUuid !== undefined && entity.promotionUuid !== undefined) {
      return this.campaignPromotions.filter((campaignPromotion) =>
        campaignPromotion.campaignUuid === entity.campaignUuid &&
        campaignPromotion.promotionUuid === entity.promotionUuid
      )
    }

    if (entity.campaignUuid !== undefined) {
      return this.campaignPromotions.filter((campaignPromotion) =>
        campaignPromotion.campaignUuid === entity.campaignUuid
      )
    }

    if (entity.promotionUuid !== undefined) {
      return this.campaignPromotions.filter((campaignPromotion) =>
        campaignPromotion.promotionUuid === entity.promotionUuid
      )
    }

    return []
  }

  public async createOne (
    entity: CampaignPromotionEntity
  ): Promise<void> {
    this.campaignPromotions.push(entity);
  }

  public async updateOneByUuid (
    entity: Pick<CampaignPromotionEntity, 'uuid' | 'active'>
  ): Promise<void> {
    this.campaignPromotions.filter((campaignPromotion) => {
      if (campaignPromotion.uuid === entity.uuid) {
        campaignPromotion = { ...campaignPromotion, ...entity };
      }

      return campaignPromotion
    })
  }
}
