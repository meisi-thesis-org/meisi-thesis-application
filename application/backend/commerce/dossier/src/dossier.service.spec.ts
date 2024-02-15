import { describe, expect, it, vi } from 'vitest';
import { DossierService } from './dossier.service';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type DossierEntity, type DossierDTO } from './structs/dossier.domain';
import { DossierStateRepository } from './repositories/dossier-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('DossierService', () => {
  const instance = new DossierService();

  it('should have an instanceOf DossierService', () => {
    expect(instance).toBeInstanceOf(DossierService)
  })
  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomNumber = randomProvider.randomNumber();
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const dossierDTO: DossierDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    designation: randomString,
    price: randomNumber,
    visible: true,
    active: true,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findDossierByUuid', () => {
    async function callFindDossierByUuid (): Promise<DossierEntity> {
      return await instance.findDossierByUuid({
        uuid: randomUuid
      })
    }

    it('should have returned DossierDTO', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockResolvedValue(dossierDTO)
      await expect(callFindDossierByUuid()).resolves.toEqual(dossierDTO)
    })

    it('should throw a NonFoundException because Repository.findDossierByUuid returned undefined ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockResolvedValue(undefined)
      await expect(callFindDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findDossierByUuid threw InternalServerException ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findDossierByUserUuid', () => {
    async function callFindDossierByUuid (): Promise<DossierEntity> {
      return await instance.findDossierByUserUuid({
        userUuid: randomUuid
      })
    }

    it('should have returned DossierDTO', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockResolvedValue(dossierDTO)
      await expect(callFindDossierByUuid()).resolves.toEqual(dossierDTO)
    })

    it('should throw a NonFoundException because Repository.findDossierByUserUuid returned undefined ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockResolvedValue(undefined)
      await expect(callFindDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findDossierByUserUuid threw InternalServerException ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('createDossier', () => {
    async function callCreateDossier (): Promise<DossierEntity> {
      return await instance.createDossier({
        userUuid: randomUuid,
        designation: randomString,
        price: randomNumber,
      })
    }

    it('should resolve to be defined', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DossierStateRepository.prototype, 'createDossier').mockResolvedValue()

      await expect(callCreateDossier()).resolves.toBeDefined()
    })

    it('should throw a NonFoundException because Repository.findDossierByUserUuid returned other than undefined ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockResolvedValue(dossierDTO)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DossierStateRepository.prototype, 'createDossier').mockResolvedValue()
      await expect(callCreateDossier()).rejects.toThrow(ConflictException)
    })

    it('should throw a InternalServerException because Repository.findDossierByUserUuid threw InternalServerException ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockRejectedValue(new InternalServerException())
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DossierStateRepository.prototype, 'createDossier').mockResolvedValue()
      await expect(callCreateDossier()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createDossier threw InternalServerException ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUserUuid').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DossierStateRepository.prototype, 'createDossier').mockRejectedValue(new InternalServerException())
      await expect(callCreateDossier()).rejects.toThrow(InternalServerException)
    })
  })

  describe('updateDossierByUuid', () => {
    async function callUpdateDossierByUuid (): Promise<DossierEntity> {
      return await instance.updateDossierByUuid({
        uuid: randomUuid,
        designation: randomString,
        visible: true,
        active: true
      })
    }

    it('should to equal DossierDTO', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockResolvedValue(dossierDTO)
      vi.spyOn(DossierStateRepository.prototype, 'updateDossierByUuid').mockResolvedValue(dossierDTO)

      await expect(callUpdateDossierByUuid()).resolves.toEqual(dossierDTO)
    })

    it('should throw a NonFoundException because Repository.findDossierByUuid returned undefined ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockResolvedValue(undefined)
      vi.spyOn(DossierStateRepository.prototype, 'updateDossierByUuid').mockResolvedValue(dossierDTO)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findDossierByUserUuid threw InternalServerException ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockRejectedValue(new InternalServerException())
      vi.spyOn(DossierStateRepository.prototype, 'updateDossierByUuid').mockResolvedValue(dossierDTO)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(InternalServerException)
    })

    it('should throw a NonFoundException because Repository.updateDossierByUuid returned undefined ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockResolvedValue(dossierDTO)
      vi.spyOn(DossierStateRepository.prototype, 'updateDossierByUuid').mockResolvedValue(undefined)
      await expect(callUpdateDossierByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findDossierByUserUuid threw InternalServerException ', async () => {
      vi.spyOn(DossierStateRepository.prototype, 'findDossierByUuid').mockResolvedValue(dossierDTO)
      vi.spyOn(DossierStateRepository.prototype, 'updateDossierByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateDossierByUuid()).rejects.toThrow(InternalServerException)
    })
  })
})
