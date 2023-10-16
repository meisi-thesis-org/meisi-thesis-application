import { afterEach, describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { CampaignPromotionService } from './campaign-promotion.service';
import { type CampaignPromotionEntity } from './structs/campaign-promotion.domain';
import { CampaignPromotionStateRepository } from './repositories/campaign-promotion-state.repository';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';

describe('CampaignPromotionService', () => {
  const instance = new CampaignPromotionService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const campaignPromotionEntity: CampaignPromotionEntity = {
    uuid: randomProvider.randomUUID(),
    promotionUuid: randomProvider.randomUUID(),
    campaignUuid: randomProvider.randomUUID(),
    active: randomProvider.randomBoolean(),
    createdAt: randomProvider.randomDateToIsoString(),
    updatedAt: randomProvider.randomDateToIsoString()
  }

  describe('findOneByUuid', () => {
    async function callFindOneByUuid () {
      return await instance.findOneByUuid({ uuid: 'dummyUuid' });
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service returned undefined', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a campaign-promotion collection', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(campaignPromotionEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        promotionUuid: randomProvider.randomUUID(),
        campaignUuid: randomProvider.randomUUID()
      });
    }

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a campaign-promotion entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: campaignPromotionEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid threw an error', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a campaign-promotion entity', async () => {
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(campaignPromotionEntity);
      vi.spyOn(CampaignPromotionStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
