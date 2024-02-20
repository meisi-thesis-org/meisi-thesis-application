import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PageController } from './page.controller';
import { type PageDTO } from './structs/page.domain';
import { PageService } from './page.service';

describe('PageController', () => {
  const instance = new PageController();

  it('should have an instance of PageController', () => {
    expect(instance).toBeInstanceOf(PageController);
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
  const randomString = randomProvider.randomString(16);
  const randomNumber = randomProvider.randomNumber();
  const randomDateBirth = new Date().toISOString();

  const pageDTO: PageDTO = {
    uuid: randomUuid,
    chapterUuid: randomUuid,
    designation: randomString,
    description: randomString,
    price: randomNumber,
    active: randomBoolean,
    visible: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findPageByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
    })

    async function callFindPageByUuid (): Promise<Response> {
      return await instance.findPageByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PageService.prototype, 'findPageByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindPageByUuid()).resolves.toEqual(new Error());
    })

    it('should return a pageDTO', async () => {
      vi.spyOn(PageService.prototype, 'findPageByUuid').mockResolvedValue(pageDTO);
      defineResponseMock(pageDTO);

      await expect(callFindPageByUuid()).resolves.toEqual(pageDTO);
    })
  })

  describe('findPagesByQuery', () => {
    beforeEach(() => {
      requestMock.query = {
        ...requestMock.query,
        chapterUuid: randomUuid
      }
    })

    async function callFindPagesByForeignsUuid (): Promise<Response> {
      return await instance.findPagesByQuery(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PageService.prototype, 'findPagesByQuery').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindPagesByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return a pageDTO collection', async () => {
      vi.spyOn(PageService.prototype, 'findPagesByQuery').mockResolvedValue([pageDTO]);
      defineResponseMock([pageDTO]);

      await expect(callFindPagesByForeignsUuid()).resolves.toEqual([pageDTO]);
    })
  })

  describe('createPage', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        chapterUuid: randomUuid,
        designation: randomString,
        description: randomString,
        price: randomNumber,
      }
    })

    async function callCreaatePage (): Promise<Response> {
      return await instance.createPage(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PageService.prototype, 'createPage').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreaatePage()).resolves.toEqual(new Error());
    })

    it('should return a pageDTO', async () => {
      vi.spyOn(PageService.prototype, 'createPage').mockResolvedValue(pageDTO);
      defineResponseMock(pageDTO);

      await expect(callCreaatePage()).resolves.toEqual(pageDTO);
    })
  })

  describe('updatePageByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = { ...requestMock.body, designation: randomString, description: randomString, price: randomNumber, active: randomBoolean, visible: randomBoolean }
    })

    async function callUpdatePageByUuid (): Promise<Response> {
      return await instance.updatePageByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(PageService.prototype, 'updatePageByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdatePageByUuid()).resolves.toEqual(new Error());
    })

    it('should return a pageDTO', async () => {
      vi.spyOn(PageService.prototype, 'updatePageByUuid').mockResolvedValue(pageDTO);
      defineResponseMock(pageDTO);

      await expect(callUpdatePageByUuid()).resolves.toEqual(pageDTO);
    })
  })
})
