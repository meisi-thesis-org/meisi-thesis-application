import { afterEach, describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { SubscriptionService } from './subscription.service';
import { type SubscriptionEntity } from './domain/subscription.domain';
import { SubscriptionStateRepository } from './repositories/subscription-state.repository';

describe('SubscriptionService', () => {
  const instance = new SubscriptionService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const subscriptionEntity: SubscriptionEntity = {
    uuid: randomProvider.randomUUID(),
    userUuid: randomProvider.randomUUID(),
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
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service returned undefined', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a Subscription collection', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(subscriptionEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        userUuid: randomProvider.randomUUID(),
        subscriptionPlanUuid: randomProvider.randomUUID()
      });
    }

    it('should have an InternalServerException because service findOneByUserSubscriptionPlan threw an error', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUserSubscriptionPlan').mockRejectedValue(new Error());
      vi.spyOn(SubscriptionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an ConflictException because service findOneByUserSubscriptionPlan returned an entity', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUserSubscriptionPlan').mockResolvedValue(subscriptionEntity);
      vi.spyOn(SubscriptionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUserSubscriptionPlan').mockResolvedValue(undefined);
      vi.spyOn(SubscriptionStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a Subscription entity', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUserSubscriptionPlan').mockResolvedValue(undefined);
      vi.spyOn(SubscriptionStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: subscriptionEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid threw an error', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(SubscriptionStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a Subscription entity', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findOneByUuid').mockResolvedValue(subscriptionEntity);
      vi.spyOn(SubscriptionStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
