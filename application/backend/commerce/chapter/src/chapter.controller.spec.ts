import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ChapterController } from './chapter.controller';
import { type ChapterDTO } from './structs/chapter.domain';
import { ChapterService } from './chapter.service';

describe('ChapterController', () => {
  const instance = new ChapterController();

  it('should have an instance of ChapterController', () => {
    expect(instance).toBeInstanceOf(ChapterController);
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

  const chapterDTO: ChapterDTO = {
    uuid: randomUuid,
    bookUuid: randomUuid,
    designation: randomString,
    description: randomString,
    visible: true,
    active: true,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findChapterByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
    })

    async function callFindChapterByUuid (): Promise<Response> {
      return await instance.findChapterByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ChapterService.prototype, 'findChapterByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindChapterByUuid()).resolves.toEqual(new Error());
    })

    it('should return an ChapterDTO collection', async () => {
      vi.spyOn(ChapterService.prototype, 'findChapterByUuid').mockResolvedValue(chapterDTO);
      defineResponseMock(chapterDTO);

      await expect(callFindChapterByUuid()).resolves.toEqual(chapterDTO);
    })
  })

  describe('findChaptersByBookUuid', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, bookUuid: 'dummyBookUuid' }
    })

    async function callFindChaptersByDossierUuid (): Promise<Response> {
      return await instance.findChaptersByBookUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ChapterService.prototype, 'findChaptersByBookUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindChaptersByDossierUuid()).resolves.toEqual(new Error());
    })

    it('should return a collection of ChapterDTO', async () => {
      vi.spyOn(ChapterService.prototype, 'findChaptersByBookUuid').mockResolvedValue([chapterDTO]);
      defineResponseMock([chapterDTO]);

      await expect(callFindChaptersByDossierUuid()).resolves.toEqual([chapterDTO]);
    })
  })

  describe('createChapter', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        bookUuid: 'dummyBookUuid',
        designation: 'dummyDesignation',
        description: 'dummyDescription'
      }
    })

    async function callCreateChapter (): Promise<Response> {
      return await instance.createChapter(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ChapterService.prototype, 'createChapter').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateChapter()).resolves.toEqual(new Error());
    })

    it('should return a ChapterDTO', async () => {
      vi.spyOn(ChapterService.prototype, 'createChapter').mockResolvedValue(chapterDTO);
      defineResponseMock(chapterDTO);

      await expect(callCreateChapter()).resolves.toEqual(chapterDTO);
    })
  })

  describe('updateChapterByUuid', () => {
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

    async function callUpdateChapterByUuid (): Promise<Response> {
      return await instance.updateChapterByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(ChapterService.prototype, 'updateChapterByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateChapterByUuid()).resolves.toEqual(new Error());
    })

    it('should return an ChapterDTO collection', async () => {
      vi.spyOn(ChapterService.prototype, 'updateChapterByUuid').mockResolvedValue(chapterDTO);
      defineResponseMock(chapterDTO);

      await expect(callUpdateChapterByUuid()).resolves.toEqual(chapterDTO);
    })
  })
})
