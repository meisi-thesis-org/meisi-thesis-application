import { afterEach, describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PromotionSubscriptionPlanService } from './promotion-subscription-plan.service';
import { type PromotionSubscriptionPlanEntity } from './structs/promotion-subscription-plan.domain';
import { PromotionSubscriptionPlanStateRepository } from './repositories/promotion-subscription-plan-state.repository';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';

describe('PromotionSubscriptionPlanService', () => {
  const instance = new PromotionSubscriptionPlanService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const PromotionSubscriptionPlanEntity: PromotionSubscriptionPlanEntity = {
    uuid: randomProvider.randomUUID(),
    promotionUuid: randomProvider.randomUUID(),
    subscriptionPlanUuid: randomProvider.randomUUID(),
    active: randomProvider.randomBoolean(),
    createdAt: randomProvider.randomDateToIsoString(),
    updatedAt: randomProvider.randomDateToIsoString()
  }

  describe('findOneByUuid', () => {
    async function callFindOneByUuid () {
      return await instance.findOneByUuid({ uuid: 'dummyUuid' });
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service returned undefined', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a promotion-subscription-plan collection', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(PromotionSubscriptionPlanEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        promotionUuid: randomProvider.randomUUID(),
        subscriptionPlanUuid: randomProvider.randomUUID()
      });
    }

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a promotion-subscription-plan entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: PromotionSubscriptionPlanEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid threw an error', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a promotion-subscription-plan entity', async () => {
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(PromotionSubscriptionPlanEntity);
      vi.spyOn(PromotionSubscriptionPlanStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
