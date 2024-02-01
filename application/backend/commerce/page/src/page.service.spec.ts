import { describe, expect, it, vi } from 'vitest';
import { PageService } from './page.service';
import { pageMapper, type PageEntity } from './structs/page.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { PageStateRepository } from './repositories/page-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { BadRequestException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/bad-request.exception';

describe('PageService', () => {
  const instance = new PageService();

  it('should have an instance of PageService', () => {
    expect(instance).toBeInstanceOf(PageService);
  })

  const randomProvider = new RandomProvider();

  const randomBoolean = randomProvider.randomBoolean();
  const randomUuid = randomProvider.randomUUID();
  const randomString = randomProvider.randomString(16);
  const randomDateBirth = new Date().toISOString();

  const pageEntity: PageEntity = {
    uuid: randomUuid,
    chapterUuid: randomUuid,
    description: randomString,
    active: randomBoolean,
    visible: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findPageByUuid', () => {
    async function callFindPageByUuid (): Promise<PageEntity> {
      return await instance.findPageByUuid({
        uuid: randomUuid
      })
    }

    it('should have returned a pageDTO', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockResolvedValue(pageEntity)
      await expect(callFindPageByUuid()).resolves.toEqual(pageMapper(pageEntity))
    })

    it('should throw a NonFoundException because Repository.findPageByUuid returned undefined ', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockResolvedValue(undefined)
      await expect(callFindPageByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findPageByUuid threw InternalServerException ', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindPageByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findPagesByChapterUuid', () => {
    async function callFindPageByForeignsUuid (): Promise<PageEntity[]> {
      return await instance.findPagesByChapterUuid({
        chapterUuid: randomUuid
      })
    }

    it('should have returned a pageDTO collection', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPagesByChapterUuid').mockResolvedValue([pageEntity])
      await expect(callFindPageByForeignsUuid()).resolves.toEqual([pageEntity])
    })

    it('should throw a NonFoundException because Repository.findPagesByChapterUuid returned an empty array', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPagesByChapterUuid').mockResolvedValue([])
      await expect(callFindPageByForeignsUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findPagesByChapterUuid threw InternalServerException', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPagesByChapterUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindPageByForeignsUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('createPage', () => {
    async function callCreatePage (): Promise<PageEntity> {
      return await instance.createPage({
        chapterUuid: randomUuid,
        description: randomString
      })
    }

    it('should be defined', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: true });
      vi.spyOn(PageStateRepository.prototype, 'createPage').mockResolvedValue()
      await expect(callCreatePage()).resolves.toBeDefined()
    })

    it('should throw a InternalServerException because Repository.createPage threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: true });
      vi.spyOn(PageStateRepository.prototype, 'createPage').mockRejectedValue(new InternalServerException())
      await expect(callCreatePage()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because NetworkProvider.doHttpRequest threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockRejectedValue(new InternalServerException());
      await expect(callCreatePage()).rejects.toThrow(InternalServerException)
    })

    it('should throw a BadRequestException because NetworkProvider.doHttpRequest return an inactive entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: false, visible: true });
      await expect(callCreatePage()).rejects.toThrow(BadRequestException)
    })

    it('should throw a BadRequestException because NetworkProvider.doHttpRequest return an disabled entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: false });
      await expect(callCreatePage()).rejects.toThrow(BadRequestException)
    })
  })

  describe('updatePageByUuid', () => {
    async function callUpdatePageByUuid (): Promise<PageEntity> {
      return await instance.updatePageByUuid({
        uuid: randomUuid,
        description: randomString,
        active: randomBoolean,
        visible: randomBoolean
      })
    }

    it('should be defined', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockResolvedValue(pageEntity)
      vi.spyOn(PageStateRepository.prototype, 'updatePageByUuid').mockResolvedValue()
      await expect(callUpdatePageByUuid()).resolves.toBeDefined()
    })

    it('should throw a NonFoundException because Repository.findPageByUuid returned undefined', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockResolvedValue(undefined)
      await expect(callUpdatePageByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findPageByUuid threw InternalServerException', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdatePageByUuid()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createPage threw InternalServerException', async () => {
      vi.spyOn(PageStateRepository.prototype, 'findPageByUuid').mockResolvedValue(pageEntity)
      vi.spyOn(PageStateRepository.prototype, 'updatePageByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdatePageByUuid()).rejects.toThrow(InternalServerException)
    })
  })
})
