import { describe, expect, it, vi } from 'vitest';
import { SubscriptionService } from './subscription.service';
import { subscriptionMapper, type SubscriptionEntity } from './structs/subscription.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { SubscriptionStateRepository } from './repositories/subscription-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { BadRequestException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/bad-request.exception';

describe('SubscriptionService', () => {
  const instance = new SubscriptionService();

  it('should have an instance of SubscriptionService', () => {
    expect(instance).toBeInstanceOf(SubscriptionService);
  })

  const randomProvider = new RandomProvider();

  const randomBoolean = randomProvider.randomBoolean();
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const subscriptionEntity: SubscriptionEntity = {
    uuid: randomUuid,
    walletUuid: randomUuid,
    dossierUuid: randomUuid,
    bookUuid: randomUuid,
    chapterUuid: randomUuid,
    pageUuid: randomUuid,
    active: randomBoolean,
    enabled: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findSubscriptionByUuid', () => {
    async function callFindSubscriptionByUuid (): Promise<SubscriptionEntity> {
      return await instance.findSubscriptionByUuid({
        uuid: randomUuid
      })
    }

    it('should have returned a subscriptionDTO', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockResolvedValue(subscriptionEntity)
      await expect(callFindSubscriptionByUuid()).resolves.toEqual(subscriptionMapper(subscriptionEntity))
    })

    it('should throw a NonFoundException because Repository.findSubscriptionByUuid returned undefined ', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockResolvedValue(undefined)
      await expect(callFindSubscriptionByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findSubscriptionByUuid threw InternalServerException ', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindSubscriptionByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findSubscriptionsByForeignsUuid', () => {
    async function callFindSubscriptionByForeignsUuid (): Promise<SubscriptionEntity[]> {
      return await instance.findSubscriptionsByForeignsUuid({
        walletUuid: randomUuid,
        dossierUuid: randomUuid,
        bookUuid: randomUuid,
        chapterUuid: randomUuid,
        pageUuid: randomUuid
      })
    }

    it('should have returned a subscriptionDTO collection', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([subscriptionEntity])
      await expect(callFindSubscriptionByForeignsUuid()).resolves.toEqual([subscriptionMapper(subscriptionEntity)])
    })

    it('should throw a NonFoundException because Repository.findSubscriptionsByForeignsUuid returned array with a length of zero', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([])
      await expect(callFindSubscriptionByForeignsUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findSubscriptionsByForeignsUuid threw InternalServerException', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindSubscriptionByForeignsUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('createSubscription', () => {
    async function callCreateSubscription (): Promise<SubscriptionEntity> {
      return await instance.createSubscription({
        walletUuid: randomUuid,
        pageUuid: randomUuid
      })
    }

    it('should be defined', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ uuid: randomUuid, price: 10, active: true, enabled: true });
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([])
      vi.spyOn(SubscriptionStateRepository.prototype, 'createSubscription').mockResolvedValue()
      await expect(callCreateSubscription()).resolves.toBeDefined()
    })

    it('should throw a ConflictException because Repository.findSubscriptionsByForeignsUuid returned array with a length greater than zero', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ uuid: randomUuid, price: 10, active: true, enabled: true });
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([subscriptionEntity])
      await expect(callCreateSubscription()).rejects.toThrow(ConflictException)
    })

    it('should throw a InternalServerException because Repository.findSubscriptionsByForeignsUuid threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ uuid: randomUuid, price: 10, active: true, enabled: true });
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockRejectedValue(new InternalServerException())
      await expect(callCreateSubscription()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createSubscription threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ uuid: randomUuid, price: 10, active: true, enabled: true });
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([])
      vi.spyOn(SubscriptionStateRepository.prototype, 'createSubscription').mockRejectedValue(new InternalServerException())
      await expect(callCreateSubscription()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because NetworkProvider.doHttpRequest threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockRejectedValue(new InternalServerException());
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([])
      await expect(callCreateSubscription()).rejects.toThrow(InternalServerException)
    })

    it('should throw a BadRequestException because NetworkProvider.doHttpRequest return an inactive entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ uuid: randomUuid, price: 10, active: false, enabled: true });
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([])
      await expect(callCreateSubscription()).rejects.toThrow(BadRequestException)
    })

    it('should throw a BadRequestException because NetworkProvider.doHttpRequest return an disabled entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ uuid: randomUuid, price: 10, active: true, enabled: false });
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([])
      await expect(callCreateSubscription()).rejects.toThrow(BadRequestException)
    })
  })

  describe('updateSubscriptionByUuid', () => {
    async function callUpdateSubscriptionByUuid (): Promise<SubscriptionEntity> {
      return await instance.updateSubscriptionByUuid({
        uuid: randomUuid,
        active: randomBoolean,
        enabled: randomBoolean
      })
    }

    it('should be defined', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockResolvedValue(subscriptionEntity)
      vi.spyOn(SubscriptionStateRepository.prototype, 'updateSubscriptionByUuid').mockResolvedValue()
      await expect(callUpdateSubscriptionByUuid()).resolves.toBeDefined()
    })

    it('should throw a NonFoundException because Repository.findSubscriptionByUuid returned undefined', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockResolvedValue(undefined)
      await expect(callUpdateSubscriptionByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findSubscriptionByUuid threw InternalServerException', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateSubscriptionByUuid()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createSubscription threw InternalServerException', async () => {
      vi.spyOn(SubscriptionStateRepository.prototype, 'findSubscriptionByUuid').mockResolvedValue(subscriptionEntity)
      vi.spyOn(SubscriptionStateRepository.prototype, 'updateSubscriptionByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateSubscriptionByUuid()).rejects.toThrow(InternalServerException)
    })
  })
})
