import { describe, expect, it, vi } from 'vitest';
import { CampaignPromotionService } from './campaign-promotion.service';
import { type FindCampaignPromotionsByForeignsUuidRequest, type FindCampaignPromotionByUuidRequest, type CreateCampaignPromotionRequest, type UpdateCampaignPromotionByUuidRequest } from './structs/campaign-promotion.request';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { CampaignPromotionStateRepository } from './repositories/campaign-promotion-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type CampaignPromotionDTO, type CampaignPromotionEntity } from './structs/campaign-promotion.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('CampaignPromotionService', () => {
  const instance = new CampaignPromotionService();
  const randomProvider = new RandomProvider();

  const dummyUuid = randomProvider.randomUUID();
  const dummyBoolean = randomProvider.randomBoolean();
  const dummyDate = randomProvider.randomDateToIsoString();

  const entity: CampaignPromotionEntity = {
    uuid: dummyUuid,
    campaignUuid: dummyUuid,
    promotionUuid: dummyUuid,
    active: dummyBoolean,
    createdAt: dummyDate,
    updatedAt: dummyDate
  }

  describe('findOneByUuid', () => {
    const requestArgs: FindCampaignPromotionByUuidRequest = { uuid: dummyUuid };

    async function findOneByUuid (): Promise<CampaignPromotionDTO> {
      return await instance.findOneByUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByUuid threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await findOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an NonFoundException because repository findOneByUuid returned undefined', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(async () => await findOneByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should strictly equal entity because repository findOneByUuid returned an entity', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      await expect(findOneByUuid()).resolves.toStrictEqual(entity);
    })
  })
  describe('findBulkByForeignsUuid', () => {
    const requestArgs: FindCampaignPromotionsByForeignsUuidRequest = {
      campaignUuid: dummyUuid,
      promotionUuid: dummyUuid
    };

    async function findBulkByForeignsUuid (): Promise<CampaignPromotionDTO[]> {
      return await instance.findBulkByForeignsUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findBulkByForeignsUuid threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findBulkByForeignsUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await findBulkByForeignsUuid()).rejects.toThrow(InternalServerException);
    })

    it('should strictly equal entity collection because repository findBulkByForeignsUuid returned an entity collection', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findBulkByForeignsUuid').mockResolvedValue([entity]);
      await expect(findBulkByForeignsUuid()).resolves.toStrictEqual([entity]);
    })
  })
  describe('createOne', () => {
    const requestArgs: CreateCampaignPromotionRequest = {
      campaignUuid: dummyUuid,
      promotionUuid: dummyUuid
    };

    async function createOne (): Promise<CampaignPromotionDTO> {
      return await instance.createOne(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByForeignsUuid threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByForeignsUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await createOne()).rejects.toThrow(InternalServerException);
    })

    it('should throw an ConflictException because repository findOneByForeignsUuid returned an entity', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(entity);
      await expect(async () => await createOne()).rejects.toThrow(ConflictException);
    })

    it('should throw an InternalServerException because repository findOneByForeignsUuid returned an undefined', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(undefined);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'createOne').mockRejectedValue(new InternalServerException());
      await expect(async () => await createOne()).rejects.toThrow(InternalServerException);
    })

    it('should be defined because repository createOne returned an entity', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(undefined);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'createOne').mockResolvedValue();
      await expect(createOne()).resolves.toBeDefined();
    })
  })
  describe('updateOneByUuid', () => {
    const requestArgs: UpdateCampaignPromotionByUuidRequest = {
      uuid: dummyUuid,
      active: dummyBoolean
    };

    async function updateOneByUuid (): Promise<CampaignPromotionDTO> {
      return await instance.updateOneByUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByForeignsUuid threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(InternalServerException);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(async () => await updateOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an NonFoundException because repository findOneByUuid returned an undefined', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(async () => await updateOneByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because repository findOneByUuid returned an undefined', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await updateOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should be defined because repository updateOneByUuid returned an entity', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(updateOneByUuid()).resolves.toBeDefined()
    })
  })
})
