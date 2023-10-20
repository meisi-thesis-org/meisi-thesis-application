import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PromotionProposalController } from './promotion-proposal.controller';
import { type PromotionProposalDTO } from './structs/promotion-proposal.domain';
import { PromotionProposalService } from './promotion-proposal.service';

describe('PromotionProposalController', () => {
  const instance = new PromotionProposalController();

  it('should have an instanceOf PromotionProposalController', () => {
    expect(instance).toBeInstanceOf(PromotionProposalController)
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const promotionProposalDTO: PromotionProposalDTO = {
    uuid: randomUuid,
    proposalUuid: randomUuid,
    promotionUuid: randomUuid,
    active: false,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  function updateProcessEnvExceptionQueueActive (status: boolean) {
    process.env.EXCEPTION_QUEUE_ACTIVE = String(status);
  }

  describe('findBulkByForeignsUuid', () => {
    beforeEach(() => {
      requestMock.query = {
        ...requestMock.query,
        proposalUuid: randomUuid,
        promotionUuid: randomUuid
      }
    })
    async function callFindBulkByForeignsUuid (): Promise<Response> {
      return await instance.findBulkByForeignsUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return an promotionProposalDTO collection', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'findBulkByForeignsUuid').mockResolvedValue([promotionProposalDTO]);
      defineResponseMock([promotionProposalDTO]);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual([promotionProposalDTO]);
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
      vi.spyOn(PromotionProposalService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an promotionProposalDTO', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'findOneByUuid').mockResolvedValue(promotionProposalDTO);
      defineResponseMock(promotionProposalDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(promotionProposalDTO);
    })
  })

  describe('createOne', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        proposalUuid: randomUuid,
        promotionUuid: randomUuid
      }
    })

    async function callCreateOne (): Promise<Response> {
      return await instance.createOne(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should return an promotionProposalDTO', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'createOne').mockResolvedValue(promotionProposalDTO);
      defineResponseMock(promotionProposalDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(promotionProposalDTO);
    })
  })

  describe('updateOneByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = {
        ...requestMock.body,
        active: true
      }
    })

    async function callUpdateOneByUuid (): Promise<Response> {
      return await instance.updateOneByUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an promotionProposalDTO', async () => {
      vi.spyOn(PromotionProposalService.prototype, 'updateOneByUuid').mockResolvedValue(promotionProposalDTO);
      defineResponseMock(promotionProposalDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(promotionProposalDTO);
    })
  })
})
