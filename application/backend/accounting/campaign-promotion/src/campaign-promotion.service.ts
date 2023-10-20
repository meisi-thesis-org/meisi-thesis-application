import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { campaignPromotionMapper, type CampaignPromotionDTO, type CampaignPromotionEntity } from './structs/campaign-promotion.domain';
import { type FindCampaignPromotionsByForeignsUuidRequest, type FindCampaignPromotionByUuidRequest, type CreateCampaignPromotionRequest, type UpdateCampaignPromotionByUuidRequest } from './structs/campaign-promotion.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type CampaignPromotionRepository } from './campaign-promotion.repository';
import { CampaignPromotionStateRepository } from './repositories/campaign-promotion-state.repository';

export class CampaignPromotionService {
  private readonly repository: CampaignPromotionRepository = new CampaignPromotionStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findOneByUuid (
    { uuid }: FindCampaignPromotionByUuidRequest
  ): Promise<CampaignPromotionDTO> {
    const foundCampaignPromotion = await this.repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundCampaignPromotion === undefined) throw new NonFoundException();

    return campaignPromotionMapper(foundCampaignPromotion);
  }

  public async findBulkByForeignsUuid (
    { campaignUuid, promotionUuid }: FindCampaignPromotionsByForeignsUuidRequest
  ): Promise<CampaignPromotionEntity[]> {
    const foundCampaignPromotions = await this.repository
      .findBulkByForeignsUuid(campaignUuid, promotionUuid)
      .catch(() => {
        throw new InternalServerException()
      })

    return foundCampaignPromotions.map((foundCampaignPromotion) => campaignPromotionMapper(foundCampaignPromotion));
  }

  public async createOne (
    { campaignUuid, promotionUuid }: CreateCampaignPromotionRequest
  ): Promise<CampaignPromotionEntity> {
    const foundCampaignPromotion = await this.repository
      .findOneByForeignsUuid(campaignUuid, promotionUuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundCampaignPromotion !== undefined) throw new ConflictException();

    const createdCampaignPromotion: CampaignPromotionEntity = {
      uuid: this.randomProvider.randomUUID(),
      campaignUuid,
      promotionUuid,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createdCampaignPromotion)
      .catch(() => { throw new InternalServerException() })

    return campaignPromotionMapper(createdCampaignPromotion);
  }

  public async updateOneByUuid (
    { uuid, active }: UpdateCampaignPromotionByUuidRequest
  ): Promise<CampaignPromotionEntity> {
    const foundCampaignPromotion = await this.repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundCampaignPromotion === undefined) throw new NonFoundException();

    const updateCampaignPromotion: CampaignPromotionEntity = {
      uuid: foundCampaignPromotion.uuid,
      campaignUuid: foundCampaignPromotion.campaignUuid,
      promotionUuid: foundCampaignPromotion.promotionUuid,
      active,
      createdAt: foundCampaignPromotion.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updateCampaignPromotion)
      .catch(() => { throw new InternalServerException() })

    return campaignPromotionMapper(updateCampaignPromotion);
  }
}
