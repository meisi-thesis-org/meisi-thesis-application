import { afterEach, describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PromotionService } from './promotion.service';
import { type PromotionEntity } from './domain/promotion.domain';
import { PromotionStateRepository } from './repositories/promotion-state.repository';

describe('PromotionService', () => {
  const instance = new PromotionService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const promotionEntity: PromotionEntity = {
    uuid: randomProvider.randomUUID(),
    designation: randomProvider.randomString(10),
    description: randomProvider.randomString(10),
    priceReduction: randomProvider.randomNumber(),
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
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service returned undefined', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a Promotion collection', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(promotionEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        designation: promotionEntity.designation,
        description: promotionEntity.description,
        priceReduction: promotionEntity.priceReduction
      });
    }

    it('should have an InternalServerException because service findOneByDesignation threw an error', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByDesignation').mockRejectedValue(new Error());
      vi.spyOn(PromotionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an ConflictException because service findOneByDesignation returned an entity', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(promotionEntity);
      vi.spyOn(PromotionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(PromotionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a Promotion entity', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(PromotionStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: promotionEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid threw an error', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(PromotionStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a Promotion entity', async () => {
      vi.spyOn(PromotionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(promotionEntity);
      vi.spyOn(PromotionStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
