import { describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ChapterService } from './chapter.service';
import { type ChapterEntity, type ChapterDTO } from './structs/chapter.domain';
import { ChapterStateRepository } from './repositories/chapter-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('ChapterService', () => {
  const instance = new ChapterService();

  it('should have an instanceOf ChapterService', () => {
    expect(instance).toBeInstanceOf(ChapterService)
  })
  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomNumber = randomProvider.randomNumber();
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const chapterDTO: ChapterDTO = {
    uuid: randomUuid,
    bookUuid: randomUuid,
    designation: randomString,
    description: randomString,
    price: randomNumber,
    visible: true,
    active: true,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findChapterByUuid', () => {
    async function callFindDossierByUuid (): Promise<ChapterEntity> {
      return await instance.findChapterByUuid({
        uuid: randomUuid
      })
    }

    it('should have returned ChapterDTO', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockResolvedValue(chapterDTO)
      await expect(callFindDossierByUuid()).resolves.toEqual(chapterDTO)
    })

    it('should throw a NonFoundException because Repository.findChapterByUuid returned undefined ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockResolvedValue(undefined)
      await expect(callFindDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findChapterByUuid threw InternalServerException ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findChaptersByBookUuid', () => {
    async function callFindDossierByUuid (): Promise<ChapterEntity[]> {
      return await instance.findChaptersByBookUuid({
        bookUuid: randomUuid
      })
    }

    it('should have returned a collection of ChapterDTO', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChaptersByBookUuid').mockResolvedValue([chapterDTO])
      await expect(callFindDossierByUuid()).resolves.toEqual([chapterDTO])
    })

    it('should throw a InternalServerException because Repository.findChaptersByBookUuid threw InternalServerException ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChaptersByBookUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('createChapter', () => {
    async function callCreateDossier (): Promise<ChapterEntity> {
      return await instance.createChapter({
        bookUuid: randomUuid,
        designation: randomString,
        description: randomString,
        price: randomNumber
      })
    }

    it('should resolve to be defined', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(ChapterStateRepository.prototype, 'createChapter').mockResolvedValue()

      await expect(callCreateDossier()).resolves.toBeDefined()
    })

    it('should throw a NonFoundException because Repository.findChapterByProps returned other than undefined ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByProps').mockResolvedValue(chapterDTO)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(ChapterStateRepository.prototype, 'createChapter').mockResolvedValue()
      await expect(callCreateDossier()).rejects.toThrow(ConflictException)
    })

    it('should throw a InternalServerException because Repository.findChapterByProps threw InternalServerException ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByProps').mockRejectedValue(new InternalServerException())
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(ChapterStateRepository.prototype, 'createChapter').mockResolvedValue()
      await expect(callCreateDossier()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createChapter threw InternalServerException ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(ChapterStateRepository.prototype, 'createChapter').mockRejectedValue(new InternalServerException())
      await expect(callCreateDossier()).rejects.toThrow(InternalServerException)
    })
  })

  describe('updateChapterByUuid', () => {
    async function callUpdateDossierByUuid (): Promise<ChapterEntity> {
      return await instance.updateChapterByUuid({
        uuid: randomUuid,
        designation: randomString,
        description: randomString,
        price: randomNumber,
        visible: true,
        active: true
      })
    }

    it('should to equal ChapterDTO', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockResolvedValue(chapterDTO)
      vi.spyOn(ChapterStateRepository.prototype, 'updateChapterByUuid').mockResolvedValue(chapterDTO)

      await expect(callUpdateDossierByUuid()).resolves.toEqual(chapterDTO)
    })

    it('should throw a NonFoundException because Repository.findChapterByUuid returned undefined ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockResolvedValue(undefined)
      vi.spyOn(ChapterStateRepository.prototype, 'updateChapterByUuid').mockResolvedValue(chapterDTO)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findChaptersByBookUuid threw InternalServerException ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockRejectedValue(new InternalServerException())
      vi.spyOn(ChapterStateRepository.prototype, 'updateChapterByUuid').mockResolvedValue(chapterDTO)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(InternalServerException)
    })

    it('should throw a NonFoundException because Repository.updateChapterByUuid returned undefined ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockResolvedValue(chapterDTO)
      vi.spyOn(ChapterStateRepository.prototype, 'updateChapterByUuid').mockResolvedValue(undefined)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findChaptersByBookUuid threw InternalServerException ', async () => {
      vi.spyOn(ChapterStateRepository.prototype, 'findChapterByUuid').mockResolvedValue(chapterDTO)
      vi.spyOn(ChapterStateRepository.prototype, 'updateChapterByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })
})
