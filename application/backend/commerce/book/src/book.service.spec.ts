import { describe, expect, it, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { BookService } from './book.service';
import { type BookEntity, type BookDTO } from './structs/book.domain';
import { BookStateRepository } from './repositories/book-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('BookService', () => {
  const instance = new BookService();

  it('should have an instanceOf BookService', () => {
    expect(instance).toBeInstanceOf(BookService)
  })
  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomNumber = randomProvider.randomNumber();
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const bookDTO: BookDTO = {
    uuid: randomUuid,
    dossierUuid: randomUuid,
    designation: randomString,
    description: randomString,
    price: randomNumber,
    visible: true,
    active: true,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findBookByUuid', () => {
    async function callFindDossierByUuid (): Promise<BookEntity> {
      return await instance.findBookByUuid({
        uuid: randomUuid
      })
    }

    it('should have returned BookDTO', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockResolvedValue(bookDTO)
      await expect(callFindDossierByUuid()).resolves.toEqual(bookDTO)
    })

    it('should throw a NonFoundException because Repository.findBookByUuid returned undefined ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockResolvedValue(undefined)
      await expect(callFindDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findBookByUuid threw InternalServerException ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findBooksByQuery', () => {
    async function callFindDossierByUuid (): Promise<BookEntity[]> {
      return await instance.findBooksByQuery({
        dossierUuid: randomUuid
      })
    }

    it('should have returned a collection of BookDTO', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBooksByQuery').mockResolvedValue([bookDTO])
      await expect(callFindDossierByUuid()).resolves.toEqual([bookDTO])
    })

    it('should throw a InternalServerException because Repository.findBooksByQuery threw InternalServerException ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBooksByQuery').mockRejectedValue(new InternalServerException())
      await expect(callFindDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('createBook', () => {
    async function callCreateDossier (): Promise<BookEntity> {
      return await instance.createBook({
        dossierUuid: randomUuid,
        designation: randomString,
        description: randomString,
        price: randomNumber
      })
    }

    it('should resolve to be defined', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(BookStateRepository.prototype, 'createBook').mockResolvedValue()

      await expect(callCreateDossier()).resolves.toBeDefined()
    })

    it('should throw a NonFoundException because Repository.findBookByProps returned other than undefined ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByProps').mockResolvedValue(bookDTO)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(BookStateRepository.prototype, 'createBook').mockResolvedValue()
      await expect(callCreateDossier()).rejects.toThrow(ConflictException)
    })

    it('should throw a InternalServerException because Repository.findBookByProps threw InternalServerException ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByProps').mockRejectedValue(new InternalServerException())
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(BookStateRepository.prototype, 'createBook').mockResolvedValue()
      await expect(callCreateDossier()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createBook threw InternalServerException ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(BookStateRepository.prototype, 'createBook').mockRejectedValue(new InternalServerException())
      await expect(callCreateDossier()).rejects.toThrow(InternalServerException)
    })
  })

  describe('updateBookByUuid', () => {
    async function callUpdateDossierByUuid (): Promise<BookEntity> {
      return await instance.updateBookByUuid({
        uuid: randomUuid,
        designation: randomString,
        description: randomString,
        price: randomNumber,
        visible: true,
        active: true
      })
    }

    it('should to equal BookDTO', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockResolvedValue(bookDTO)
      vi.spyOn(BookStateRepository.prototype, 'updateBookByUuid').mockResolvedValue(bookDTO)

      await expect(callUpdateDossierByUuid()).resolves.toEqual(bookDTO)
    })

    it('should throw a NonFoundException because Repository.findBookByUuid returned undefined ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockResolvedValue(undefined)
      vi.spyOn(BookStateRepository.prototype, 'updateBookByUuid').mockResolvedValue(bookDTO)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findBooksByQuery threw InternalServerException ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockRejectedValue(new InternalServerException())
      vi.spyOn(BookStateRepository.prototype, 'updateBookByUuid').mockResolvedValue(bookDTO)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(InternalServerException)
    })

    it('should throw a NonFoundException because Repository.updateBookByUuid returned undefined ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockResolvedValue(bookDTO)
      vi.spyOn(BookStateRepository.prototype, 'updateBookByUuid').mockResolvedValue(undefined)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findBooksByQuery threw InternalServerException ', async () => {
      vi.spyOn(BookStateRepository.prototype, 'findBookByUuid').mockResolvedValue(bookDTO)
      vi.spyOn(BookStateRepository.prototype, 'updateBookByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })
})
