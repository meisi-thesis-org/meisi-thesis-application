import { type CampaignEntity } from './campaign.domain';

type FindCampaignByUuidRequest = Pick<CampaignEntity, 'uuid'>;
type CreateCampaignRequest = Readonly<Pick<CampaignEntity, 'designation' | 'description'>>;
type UpdateCampaignByUuidRequest =
    Readonly<Pick<CampaignEntity, 'uuid'>> &
    Partial<Readonly<Omit<CampaignEntity, 'createdAt' | 'updatedAt'>>>;

export type {
  FindCampaignByUuidRequest,
  CreateCampaignRequest,
  UpdateCampaignByUuidRequest
}
