import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type SubscriptionPlanDTO } from './domain/subscription-plan.domain';
import { SubscriptionPlanService } from './subscription-plan.service';

describe('SubscriptionPlanController', () => {
  const instance = new SubscriptionPlanController();

  it('should have an instanceOf SubscriptionPlanController', () => {
    expect(instance).toBeInstanceOf(SubscriptionPlanController)
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const subscriptionPlanDTO: SubscriptionPlanDTO = {
    uuid: randomUuid,
    designation: randomString,
    description: randomString,
    price: 0,
    visible: false,
    active: false,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  function updateProcessEnvExceptionQueueActive (status: boolean) {
    process.env.EXCEPTION_QUEUE_ACTIVE = String(status);
  }

  describe('findBulk', () => {
    async function callFindBulk (): Promise<Response> {
      return await instance.findBulk(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'findBulk').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callFindBulk()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'findBulk').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulk()).resolves.toEqual(new Error());
    })

    it('should return an SubscriptionPlanDTO collection', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'findBulk').mockResolvedValue([subscriptionPlanDTO]);
      defineResponseMock([subscriptionPlanDTO]);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulk()).resolves.toEqual([subscriptionPlanDTO]);
    })
  })

  describe('findOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
    })

    async function callFindOneByUuid (): Promise<Response> {
      return await instance.findOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an SubscriptionPlanDTO', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'findOneByUuid').mockResolvedValue(subscriptionPlanDTO);
      defineResponseMock(subscriptionPlanDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(subscriptionPlanDTO);
    })
  })
  describe('createOne', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        designation: randomString,
        description: randomString,
        price: 0
      }
    })

    async function callCreateOne (): Promise<Response> {
      return await instance.createOne(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should return an SubscriptionPlanDTO', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'createOne').mockResolvedValue(subscriptionPlanDTO);
      defineResponseMock(subscriptionPlanDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(subscriptionPlanDTO);
    })
  })
  describe('updateOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = {
        ...requestMock.body,
        designation: randomString,
        description: randomString,
        price: 0,
        visible: false,
        active: false
      }
    })

    async function callUpdateOneByUuid (): Promise<Response> {
      return await instance.updateOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an SubscriptionPlanDTO', async () => {
      vi.spyOn(SubscriptionPlanService.prototype, 'updateOneByUuid').mockResolvedValue(subscriptionPlanDTO);
      defineResponseMock(subscriptionPlanDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(subscriptionPlanDTO);
    })
  })
})
