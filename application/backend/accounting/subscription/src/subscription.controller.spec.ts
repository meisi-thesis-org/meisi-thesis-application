import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { SubscriptionController } from './subscription.controller';
import { type SubscriptionDTO } from './structs/subscription.domain';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionController', () => {
  const instance = new SubscriptionController();

  it('should have an instance of SubscriptionController', () => {
    expect(instance).toBeInstanceOf(SubscriptionController);
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomBoolean = randomProvider.randomBoolean();
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const subscriptionDTO: SubscriptionDTO = {
    uuid: randomUuid,
    walletUuid: randomUuid,
    dossierUuid: randomUuid,
    bookUuid: randomUuid,
    chapterUuid: randomUuid,
    pageUuid: randomUuid,
    active: randomBoolean,
    visible: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findSubscriptionByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
    })

    async function callFindSubscriptionByUuid (): Promise<Response> {
      return await instance.findSubscriptionByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionService.prototype, 'findSubscriptionByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindSubscriptionByUuid()).resolves.toEqual(new Error());
    })

    it('should return a subscriptionDTO', async () => {
      vi.spyOn(SubscriptionService.prototype, 'findSubscriptionByUuid').mockResolvedValue(subscriptionDTO);
      defineResponseMock(subscriptionDTO);

      await expect(callFindSubscriptionByUuid()).resolves.toEqual(subscriptionDTO);
    })
  })

  describe('findSubscriptionsByForeignsUuid', () => {
    beforeEach(() => {
      requestMock.query = {
        ...requestMock.query,
        walletUuid: randomUuid,
        dossierUuid: randomUuid,
        bookUuid: randomUuid,
        chapterUuid: randomUuid,
        pageUuid: randomUuid
      }
    })

    async function callFindSubscriptionsByForeignsUuid (): Promise<Response> {
      return await instance.findSubscriptionsByForeignsUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionService.prototype, 'findSubscriptionsByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindSubscriptionsByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return a subcriptionDTO collection', async () => {
      vi.spyOn(SubscriptionService.prototype, 'findSubscriptionsByForeignsUuid').mockResolvedValue([subscriptionDTO]);
      defineResponseMock([subscriptionDTO]);

      await expect(callFindSubscriptionsByForeignsUuid()).resolves.toEqual([subscriptionDTO]);
    })
  })

  describe('createSubscription', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        walletUuid: randomUuid,
        dossierUuid: randomUuid,
        bookUuid: randomUuid,
        chapterUuid: randomUuid,
        pageUuid: randomUuid
      }
    })

    async function callCreaateSubscription (): Promise<Response> {
      return await instance.createSubscription(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionService.prototype, 'createSubscription').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreaateSubscription()).resolves.toEqual(new Error());
    })

    it('should return a subscriptionDTO', async () => {
      vi.spyOn(SubscriptionService.prototype, 'createSubscription').mockResolvedValue(subscriptionDTO);
      defineResponseMock(subscriptionDTO);

      await expect(callCreaateSubscription()).resolves.toEqual(subscriptionDTO);
    })
  })

  describe('updateSubscriptionByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = { ...requestMock.body, active: randomBoolean, visible: randomBoolean }
    })

    async function callUpdateSubscriptionByUuid (): Promise<Response> {
      return await instance.updateSubscriptionByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionService.prototype, 'updateSubscriptionByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateSubscriptionByUuid()).resolves.toEqual(new Error());
    })

    it('should return a subscriptionDTO', async () => {
      vi.spyOn(SubscriptionService.prototype, 'updateSubscriptionByUuid').mockResolvedValue(subscriptionDTO);
      defineResponseMock(subscriptionDTO);

      await expect(callUpdateSubscriptionByUuid()).resolves.toEqual(subscriptionDTO);
    })
  })
})
