import { type CampaignEntity } from '../domain/campaign.domain';
import { type CampaignRepository } from '../campaign.repository';

export class CampaignStateRepository implements CampaignRepository {
  private readonly campaigns: CampaignEntity[] = [];

  public async findOneByUuid (
    uuid: string
  ): Promise<CampaignEntity | undefined> {
    return this.campaigns.find((promotion) => promotion.uuid === uuid);
  }

  public async findOneByDesignation (
    designation: string
  ): Promise<CampaignEntity | undefined> {
    return this.campaigns.find((promotion) => promotion.designation === designation);
  }

  public async createOne (
    promotionEntity: CampaignEntity
  ): Promise<void> {
    this.campaigns.push(promotionEntity);
  }

  public async updateOneByUuid (
    uuid: string,
    promotionEntity: Omit<CampaignEntity, 'uuid' | 'createdAt'>
  ): Promise<void> {
    this.campaigns.find((promotion) => {
      if (promotion.uuid === uuid) {
        promotion = { ...promotion, ...promotionEntity }
      }

      return promotion;
    });
  }
}
