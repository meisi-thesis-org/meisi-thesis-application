import { type CampaignEntity } from './domain/campaign.domain'

export interface CampaignRepository {
  findOneByUuid(
    uuid: string
  ): Promise<CampaignEntity | undefined>
  findOneByDesignation(
    designation: string
  ): Promise<CampaignEntity | undefined>
  createOne(
    promotionEntity: CampaignEntity
  ): Promise<void>
  updateOneByUuid(
    uuid: string,
    promotionEntity: Omit<CampaignEntity, 'uuid' | 'createdAt'>
  ): Promise<void>
}
