import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import {
  type UpdateCampaignByUuidRequest,
  type FindCampaignByUuidRequest,
  type CreateCampaignRequest
} from './domain/campaign.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type CampaignDTO, campaignMapper, type CampaignEntity } from './domain/campaign.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { CampaignStateRepository } from './repositories/campaign-state.repository';
import { type CampaignRepository } from './campaign.repository';

export class CampaignService {
  private readonly repository: CampaignRepository = new CampaignStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findOneByUuid (findCampaignByUuidRequest: FindCampaignByUuidRequest): Promise<CampaignDTO> {
    const foundCampaign = await this.repository
      .findOneByUuid(findCampaignByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundCampaign === undefined) throw new NonFoundException();

    return campaignMapper(foundCampaign);
  }

  public async createOne (createCampaignRequest: CreateCampaignRequest): Promise<CampaignDTO> {
    const foundCampaign = await this.repository
      .findOneByDesignation(createCampaignRequest.designation)
      .catch(() => { throw new InternalServerException() });

    if (foundCampaign !== undefined) throw new ConflictException();

    const createCampaign: CampaignEntity = {
      uuid: this.randomProvider.randomUUID(),
      designation: createCampaignRequest.designation,
      description: createCampaignRequest.description,
      visible: true,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createCampaign)
      .catch(() => { throw new InternalServerException() });

    return campaignMapper(createCampaign);
  }

  public async updateOneByUuid (updateCampaignByUuidRequest: UpdateCampaignByUuidRequest): Promise<CampaignDTO> {
    const foundCampaign = await this.repository
      .findOneByUuid(updateCampaignByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundCampaign === undefined) throw new NonFoundException();

    const updatedCampaign: CampaignEntity = {
      uuid: foundCampaign.uuid,
      designation: updateCampaignByUuidRequest.designation ?? foundCampaign.designation,
      description: updateCampaignByUuidRequest.description ?? foundCampaign.description,
      visible: updateCampaignByUuidRequest.visible ?? foundCampaign.visible,
      active: updateCampaignByUuidRequest.active ?? foundCampaign.active,
      createdAt: foundCampaign.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updatedCampaign.uuid, updatedCampaign)
      .catch(() => { throw new InternalServerException() });

    return campaignMapper(updatedCampaign);
  }
}
