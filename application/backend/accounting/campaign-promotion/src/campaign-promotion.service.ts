import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import {
  type UpdateCampaignPromotionByUuidRequest,
  type FindCampaignPromotionByUuidRequest,
  type CreateCampaignPromotionRequest,
  type FindCampaignPromotionsByForeignsUuidRequest
} from './structs/campaign-promotion.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type CampaignPromotionDTO, campaignPromotionMapper, type CampaignPromotionEntity } from './structs/campaign-promotion.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { CampaignPromotionStateRepository } from './repositories/campaign-promotion-state.repository';
import { type CampaignPromotionRepository } from './campaign-promotion.repository';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';

export class CampaignPromotionService {
  private readonly repository: CampaignPromotionRepository = new CampaignPromotionStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findOneByUuid (
    findCampaignPromotionByUuidRequest: FindCampaignPromotionByUuidRequest
  ): Promise<CampaignPromotionDTO> {
    const foundCampaignPromotion = await this.repository
      .findOneByUuid(findCampaignPromotionByUuidRequest)
      .catch(() => { throw new InternalServerException() });

    if (foundCampaignPromotion === undefined) throw new NonFoundException();

    return campaignPromotionMapper(foundCampaignPromotion);
  }

  public async findBulkByForeignsUuid (
    findCampaignPromotionByUuidRequest: FindCampaignPromotionsByForeignsUuidRequest
  ): Promise<CampaignPromotionDTO[]> {
    const foundCampaignPromotions = await this.repository
      .findBulkByForeignsUuid(findCampaignPromotionByUuidRequest)
      .catch(() => { throw new InternalServerException() });

    return foundCampaignPromotions.filter((foundCampaignPromotion) => campaignPromotionMapper(foundCampaignPromotion));
  }

  public async createOne (createCampaignPromotionRequest: CreateCampaignPromotionRequest): Promise<CampaignPromotionDTO> {
    await this.networkProvider.doHttpRequest(
      '8000',
      'accounting/promotions',
      'GET',
      undefined,
      { promotionUuid: createCampaignPromotionRequest.promotionUuid }
    )

    await this.networkProvider.doHttpRequest(
      '8000',
      'accounting/campaigns',
      'GET',
      undefined,
      { campaignUuid: createCampaignPromotionRequest.campaignUuid }
    )

    const createCampaignPromotion: CampaignPromotionEntity = {
      uuid: this.randomProvider.randomUUID(),
      promotionUuid: createCampaignPromotionRequest.promotionUuid,
      campaignUuid: createCampaignPromotionRequest.campaignUuid,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createCampaignPromotion)
      .catch(() => { throw new InternalServerException() });

    return campaignPromotionMapper(createCampaignPromotion);
  }

  public async updateOneByUuid (updateCampaignPromotionByUuidRequest: UpdateCampaignPromotionByUuidRequest): Promise<CampaignPromotionDTO> {
    const foundCampaignPromotion = await this.repository
      .findOneByUuid(updateCampaignPromotionByUuidRequest)
      .catch(() => { throw new InternalServerException() });

    if (foundCampaignPromotion === undefined) throw new NonFoundException();

    const updatedCampaignPromotion: CampaignPromotionEntity = {
      uuid: foundCampaignPromotion.uuid,
      promotionUuid: foundCampaignPromotion.promotionUuid,
      campaignUuid: foundCampaignPromotion.campaignUuid,
      active: updateCampaignPromotionByUuidRequest.active ?? foundCampaignPromotion.active,
      createdAt: foundCampaignPromotion.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updatedCampaignPromotion)
      .catch(() => { throw new InternalServerException() });

    return campaignPromotionMapper(updatedCampaignPromotion);
  }
}
