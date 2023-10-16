import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { CampaignPromotionController } from './campaign-promotion.controller';
import { type CampaignPromotionDTO } from './structs/campaign-promotion.domain';
import { CampaignPromotionService } from './campaign-promotion.service';

describe('CampaignPromotionController', () => {
  const instance = new CampaignPromotionController();

  it('should have an instanceOf CampaignPromotionController', () => {
    expect(instance).toBeInstanceOf(CampaignPromotionController)
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

  const campaignPromotionDTO: CampaignPromotionDTO = {
    uuid: randomUuid,
    campaignUuid: randomUuid,
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
      vi.spyOn(CampaignPromotionService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an CampaignPromotionDTO', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'findOneByUuid').mockResolvedValue(campaignPromotionDTO);
      defineResponseMock(campaignPromotionDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(campaignPromotionDTO);
    })
  })

  describe('findBulkByForeignsUuid', () => {
    beforeEach(() => {
      requestMock.params = {
        ...requestMock.params,
        campaignUuid: randomUuid,
        promotionUuid: randomUuid
      }
    })

    async function callFindBulkByForeignsUuid (): Promise<Response> {
      return await instance.findBulkByForeignsUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return a CampaignPromotionDTO collection', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'findBulkByForeignsUuid').mockResolvedValue([campaignPromotionDTO]);
      defineResponseMock([campaignPromotionDTO]);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual([campaignPromotionDTO]);
    })
  })

  describe('createOne', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        campaignUuid: randomUuid,
        promotionUuid: randomUuid
      }
    })

    async function callCreateOne (): Promise<Response> {
      return await instance.createOne(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should return an CampaignPromotionDTO', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'createOne').mockResolvedValue(campaignPromotionDTO);
      defineResponseMock(campaignPromotionDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(campaignPromotionDTO);
    })
  })

  describe('updateOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = {
        ...requestMock.body,
        campaignUuid: randomUuid,
        promotionUuid: randomUuid,
        active: randomBoolean
      }
    })

    async function callUpdateOneByUuid (): Promise<Response> {
      return await instance.updateOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an CampaignPromotionDTO', async () => {
      vi.spyOn(CampaignPromotionService.prototype, 'updateOneByUuid').mockResolvedValue(campaignPromotionDTO);
      defineResponseMock(campaignPromotionDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(campaignPromotionDTO);
    })
  })
})
