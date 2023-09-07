import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookController } from './book.controller';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type BookDTO } from './structs/book.domain';
import { BookService } from './book.service';

describe('BookController', () => {
  const instance = new BookController();

  it('should have an instance of BookController', () => {
    expect(instance).toBeInstanceOf(BookController);
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

  const bookDTO: BookDTO = {
    uuid: randomUuid,
    dossierUuid: randomUuid,
    designation: randomString,
    description: randomString,
    visible: true,
    active: true,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findBookByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
    })

    async function callFindBookByUuid (): Promise<Response> {
      return await instance.findBookByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(BookService.prototype, 'findBookByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindBookByUuid()).resolves.toEqual(new Error());
    })

    it('should return an BookDTO collection', async () => {
      vi.spyOn(BookService.prototype, 'findBookByUuid').mockResolvedValue(bookDTO);
      defineResponseMock(bookDTO);

      await expect(callFindBookByUuid()).resolves.toEqual(bookDTO);
    })
  })

  describe('findBooksByDossierUuid', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, dossierUuid: 'dummyUserUuid' }
    })

    async function callFindBooksByDossierUuid (): Promise<Response> {
      return await instance.findBooksByDossierUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(BookService.prototype, 'findBooksByDossierUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindBooksByDossierUuid()).resolves.toEqual(new Error());
    })

    it('should return a collection of BookDTO', async () => {
      vi.spyOn(BookService.prototype, 'findBooksByDossierUuid').mockResolvedValue([bookDTO]);
      defineResponseMock([bookDTO]);

      await expect(callFindBooksByDossierUuid()).resolves.toEqual([bookDTO]);
    })
  })

  describe('createBook', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        dossierUuid: 'dummyUserUuid',
        designation: 'dummyDesignation',
        description: 'dummyDescription'
      }
    })

    async function callCreateBook (): Promise<Response> {
      return await instance.createBook(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(BookService.prototype, 'createBook').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateBook()).resolves.toEqual(new Error());
    })

    it('should return a BookDTO', async () => {
      vi.spyOn(BookService.prototype, 'createBook').mockResolvedValue(bookDTO);
      defineResponseMock(bookDTO);

      await expect(callCreateBook()).resolves.toEqual(bookDTO);
    })
  })

  describe('updateBookByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
      requestMock.body = {
        ...requestMock.body,
        designation: 'dummyDesignation',
        description: 'dummyDescription',
        visible: true,
        active: true
      }
    })

    async function callUpdateBookByUuid (): Promise<Response> {
      return await instance.updateBookByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(BookService.prototype, 'updateBookByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateBookByUuid()).resolves.toEqual(new Error());
    })

    it('should return an BookDTO collection', async () => {
      vi.spyOn(BookService.prototype, 'updateBookByUuid').mockResolvedValue(bookDTO);
      defineResponseMock(bookDTO);

      await expect(callUpdateBookByUuid()).resolves.toEqual(bookDTO);
    })
  })
})
