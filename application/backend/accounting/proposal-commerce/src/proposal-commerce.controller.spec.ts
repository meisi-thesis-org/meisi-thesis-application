import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ProposalCommerceController } from './proposal-commerce.controller';
import { type ProposalCommerceDTO } from './structs/proposal-commerce.domain';
import { ProposalCommerceService } from './proposal-commerce.service';

describe('ProposalCommerceController', () => {
  const instance = new ProposalCommerceController();

  it('should have an instanceOf ProposalCommerceController', () => {
    expect(instance).toBeInstanceOf(ProposalCommerceController)
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

  const proposalCommerceDTO: ProposalCommerceDTO = {
    uuid: randomUuid,
    proposalUuid: randomUuid,
    chapterUuid: randomUuid,
    bookUuid: randomUuid,
    dossierUuid: randomUuid,
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
        chapterUuid: randomUuid,
        bookUuid: randomUuid,
        dossierUuid: randomUuid
      }
    })
    async function callFindBulkByForeignsUuid (): Promise<Response> {
      return await instance.findBulkByForeignsUuid(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'findBulkByForeignsUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return an proposalCommerceDTO collection', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'findBulkByForeignsUuid').mockResolvedValue([proposalCommerceDTO]);
      defineResponseMock([proposalCommerceDTO]);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindBulkByForeignsUuid()).resolves.toEqual([proposalCommerceDTO]);
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
      vi.spyOn(ProposalCommerceService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'findOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an proposalCommerceDTO', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'findOneByUuid').mockResolvedValue(proposalCommerceDTO);
      defineResponseMock(proposalCommerceDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callFindOneByUuid()).resolves.toEqual(proposalCommerceDTO);
    })
  })

  describe('createOne', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        proposalUuid: randomUuid,
        chapterUuid: randomUuid,
        bookUuid: randomUuid,
        dossierUuid: randomUuid
      }
    })

    async function callCreateOne (): Promise<Response> {
      return await instance.createOne(requestMock, responseMock)
    }

    it('should throw an exception because it tried to record an exception when the queue is nonActive', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'createOne').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(new Error());
    })

    it('should return an proposalCommerceDTO', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'createOne').mockResolvedValue(proposalCommerceDTO);
      defineResponseMock(proposalCommerceDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callCreateOne()).resolves.toEqual(proposalCommerceDTO);
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
      vi.spyOn(ProposalCommerceService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'updateOneByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(new Error());
    })

    it('should return an proposalCommerceDTO', async () => {
      vi.spyOn(ProposalCommerceService.prototype, 'updateOneByUuid').mockResolvedValue(proposalCommerceDTO);
      defineResponseMock(proposalCommerceDTO);
      updateProcessEnvExceptionQueueActive(false)

      await expect(callUpdateOneByUuid()).resolves.toEqual(proposalCommerceDTO);
    })
  })
})
