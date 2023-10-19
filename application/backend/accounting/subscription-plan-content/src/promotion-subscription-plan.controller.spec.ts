import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PromotionSubscriptionPlanController } from './promotion-subscription-plan.controller';
import { type PromotionSubscriptionPlanDTO } from './structs/subscription-plan-content.domain';
import { PromotionSubscriptionPlanService } from './promotion-subscription-plan.service';

describe('PromotionSubscriptionPlanController', () => {
  const instance = new PromotionSubscriptionPlanController();

  it('should have an instanceOf PromotionSubscriptionPlanController', () => {
    expect(instance).toBeInstanceOf(PromotionSubscriptionPlanController)
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomUuid = randomProvider.randomUUID();
  const randomBoolean = randomProvider.randomBoolean();
  const randomDateBirth = randomProvider.randomDateToIsoString();

  const PromotionSubscriptionPlanDTO: PromotionSubscriptionPlanDTO = {
    uuid: randomUuid,
    subscriptionPlanUuid: randomUuid,
    promotionUuid: randomUuid,
    active: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  function updateProcessEnvExceptionQueueActive (status: boolean) {
    process.env.EXCEPTION_QUEUE_ACTIVE = String(status);
  }

  describe('findOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
    })

    async function callFindOneByUuid (): Promise<Response> {
      return await instance.findOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an PromotionSubscriptionPlanDTO', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'findOneByUuid').mockResolvedValue(PromotionSubscriptionPlanDTO);
      defineResponseMock(PromotionSubscriptionPlanDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(PromotionSubscriptionPlanDTO);
    })
  })

  describe('findBulkByForeignsUuid', () => {
    beforeEach(() => {
      requestMock.params = {
        ...requestMock.params,
        subscriptionPlanUuid: randomUuid,
        promotionUuid: randomUuid
      }
    })

    async function callFindBulkByForeignsUuid (): Promise<Response> {
      return await instance.findBulkByForeignsUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return a PromotionSubscriptionPlanDTO collection', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'findBulkByForeignsUuid').mockResolvedValue([PromotionSubscriptionPlanDTO]);
      defineResponseMock([PromotionSubscriptionPlanDTO]);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual([PromotionSubscriptionPlanDTO]);
    })
  })

  describe('createOne', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        subscriptionPlanUuid: randomUuid,
        promotionUuid: randomUuid
      }
    })

    async function callCreateOne (): Promise<Response> {
      return await instance.createOne(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should return an PromotionSubscriptionPlanDTO', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'createOne').mockResolvedValue(PromotionSubscriptionPlanDTO);
      defineResponseMock(PromotionSubscriptionPlanDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(PromotionSubscriptionPlanDTO);
    })
  })

  describe('updateOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = {
        ...requestMock.body,
        subscriptionPlanUuid: randomUuid,
        promotionUuid: randomUuid,
        active: randomBoolean
      }
    })

    async function callUpdateOneByUuid (): Promise<Response> {
      return await instance.updateOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an PromotionSubscriptionPlanDTO', async () => {
      vi.spyOn(PromotionSubscriptionPlanService.prototype, 'updateOneByUuid').mockResolvedValue(PromotionSubscriptionPlanDTO);
      defineResponseMock(PromotionSubscriptionPlanDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(PromotionSubscriptionPlanDTO);
    })
  })
})
