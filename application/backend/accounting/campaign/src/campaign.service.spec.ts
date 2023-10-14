import { afterEach, describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { CampaignService } from './campaign.service';
import { type CampaignEntity } from './domain/campaign.domain';
import { CampaignStateRepository } from './repositories/campaign-state.repository';

describe('CampaignService', () => {
  const instance = new CampaignService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const campaignEntity: CampaignEntity = {
    uuid: randomProvider.randomUUID(),
    designation: randomProvider.randomString(10),
    description: randomProvider.randomString(10),
    visible: randomProvider.randomBoolean(),
    active: randomProvider.randomBoolean(),
    createdAt: randomProvider.randomDateToIsoString(),
    updatedAt: randomProvider.randomDateToIsoString()
  }

  describe('findOneByUuid', () => {
    async function callFindOneByUuid () {
      return await instance.findOneByUuid({ uuid: 'dummyUuid' });
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service returned undefined', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a Campaign collection', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockResolvedValue(campaignEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        designation: campaignEntity.designation,
        description: campaignEntity.description
      });
    }

    it('should have an InternalServerException because service findOneByDesignation threw an error', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByDesignation').mockRejectedValue(new Error());
      vi.spyOn(CampaignStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an ConflictException because service findOneByDesignation returned an entity', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(campaignEntity);
      vi.spyOn(CampaignStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(CampaignStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a Campaign entity', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(CampaignStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: campaignEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid threw an error', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(CampaignStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a Campaign entity', async () => {
      vi.spyOn(CampaignStateRepository.prototype, 'findOneByUuid').mockResolvedValue(campaignEntity);
      vi.spyOn(CampaignStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
