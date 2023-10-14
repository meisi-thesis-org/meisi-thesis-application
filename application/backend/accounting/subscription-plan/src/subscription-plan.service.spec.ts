import { afterEach, describe, expect, it, vi } from 'vitest';
import { SubscriptionPlanStateRepository } from './repositories/subscription-plan-state.repository';
import { type SubscriptionPlanEntity } from './domain/subscription-plan.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { SubscriptionPlanService } from './subscription-plan.service';

describe('SubscriptionPlanService', () => {
  const instance = new SubscriptionPlanService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const subscriptionPlanEntity: SubscriptionPlanEntity = {
    uuid: randomProvider.randomUUID(),
    designation: randomProvider.randomString(10),
    description: randomProvider.randomString(10),
    price: randomProvider.randomNumber(),
    visible: randomProvider.randomBoolean(),
    active: randomProvider.randomBoolean(),
    createdAt: randomProvider.randomDateToIsoString(),
    updatedAt: randomProvider.randomDateToIsoString()
  }

  describe('findBulk', () => {
    async function callFindBulk () {
      return await instance.findBulk();
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findBulk').mockRejectedValue(new Error());

      await expect(async () => await callFindBulk()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan collection', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findBulk').mockResolvedValue([subscriptionPlanEntity]);
      await expect(callFindBulk()).resolves.resolves.toBeTruthy();
    })
  })

  describe('findOneByUuid', () => {
    async function callFindOneByUuid () {
      return await instance.findOneByUuid({ uuid: 'dummyUuid' });
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service threw an error', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan collection', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(subscriptionPlanEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        designation: subscriptionPlanEntity.designation,
        description: subscriptionPlanEntity.description,
        price: subscriptionPlanEntity.price
      });
    }

    it('should have an InternalServerException because service findOneByDesignation threw an error', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByDesignation').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an ConflictException because service findOneByDesignation returned an entity', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(subscriptionPlanEntity);
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan entity', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: subscriptionPlanEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid returned undefined', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan entity', async () => {
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'findOneByUuid').mockResolvedValue(subscriptionPlanEntity);
      vi.spyOn(SubscriptionPlanStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
