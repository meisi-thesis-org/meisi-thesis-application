import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PromotionController } from './promotion.controller';
import { type PromotionDTO } from './domain/promotion.domain';
import { PromotionService } from './promotion.service';

describe('PromotionController', () => {
  const instance = new PromotionController();

  it('should have an instanceOf PromotionController', () => {
    expect(instance).toBeInstanceOf(PromotionController)
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
  const randomNumber = randomProvider.randomNumber();
  const randomBoolean = randomProvider.randomBoolean();
  const randomDateBirth = randomProvider.randomDateToIsoString();

  const promotionDTO: PromotionDTO = {
    uuid: randomUuid,
    designation: randomString,
    description: randomString,
    priceReduction: randomNumber,
    visible: randomBoolean,
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
      vi.spyOn(PromotionService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an PromotionDTO', async () => {
      vi.spyOn(PromotionService.prototype, 'findOneByUuid').mockResolvedValue(promotionDTO);
      defineResponseMock(promotionDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(promotionDTO);
    })
  })
  describe('createOne', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        designation: randomString,
        description: randomString,
        priceReduction: 0
      }
    })

    async function callCreateOne (): Promise<Response> {
      return await instance.createOne(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should return an PromotionDTO', async () => {
      vi.spyOn(PromotionService.prototype, 'createOne').mockResolvedValue(promotionDTO);
      defineResponseMock(promotionDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(promotionDTO);
    })
  })
  describe('updateOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = {
        ...requestMock.body,
        designation: randomString,
        description: randomString,
        priceReduction: randomNumber,
        visible: randomBoolean,
        active: randomBoolean
      }
    })

    async function callUpdateOneByUuid (): Promise<Response> {
      return await instance.updateOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(true)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an PromotionDTO', async () => {
      vi.spyOn(PromotionService.prototype, 'updateOneByUuid').mockResolvedValue(promotionDTO);
      defineResponseMock(promotionDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(promotionDTO);
    })
  })
})
