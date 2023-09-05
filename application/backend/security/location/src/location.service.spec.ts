import { describe, it, expect, vi } from 'vitest';
import { LocationService } from './location.service';
import { type LocationDTO } from './structs/location.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { LocationStateRepository } from './repositories/location-state.repository';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';

describe('LocationService', () => {
  const instance = new LocationService();

  it('should have an instanceOf LocationService', () => {
    expect(instance).toBeInstanceOf(LocationService);
  })

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomUuid = randomProvider.randomUUID();
  const randomDate = new Date().toISOString();

  const locationDTO: LocationDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    coordinateX: randomString,
    coordinateY: randomString,
    visible: true,
    active: true,
    createdAt: randomDate,
    updatedAt: randomDate
  }

  describe('findLocationsByUserUuid', () => {
    async function callFindLocationsByUserUuid (): Promise<LocationDTO[]> {
      return await instance.findLocationsByUserUuid({
        userUuid: randomUuid
      })
    }

    it('should have response toEqual a LocationDTO collection', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationsByUserUuid').mockResolvedValue([locationDTO]);
      await expect(callFindLocationsByUserUuid()).resolves.toEqual([locationDTO])
    })

    it('should have an InternalServerException because LocationStateRepository.findLocations threw InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationsByUserUuid').mockRejectedValue(InternalServerException);
      await expect(callFindLocationsByUserUuid()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('findLocationByUuid', () => {
    async function callFindLocationByUuid (): Promise<LocationDTO> {
      return await instance.findLocationByUuid({
        uuid: randomUuid
      })
    }

    it('should have response toEqual a LocationDTO', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockResolvedValue(locationDTO);
      await expect(callFindLocationByUuid()).resolves.toEqual(locationDTO)
    })

    it('should have an InternalServerException because LocationStateRepository.findLocations threw InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockRejectedValue(InternalServerException);
      await expect(callFindLocationByUuid()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('createLocation', () => {
    async function callCreateCollection (): Promise<LocationDTO> {
      return await instance.createLocation({
        userUuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString
      })
    }

    it('should have a response to be defined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(LocationStateRepository.prototype, 'createLocation').mockResolvedValue()

      await expect(callCreateCollection()).resolves.toBeDefined()
    })

    it('should throw an InternalServerException because LocationStateRepository.findLocationByProps threw InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByProps').mockRejectedValue(InternalServerException)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(LocationStateRepository.prototype, 'createLocation').mockResolvedValue()

      await expect(async () => await callCreateCollection()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an ConflictException because LocationStateRepository.findLocationByProps threw ConflictException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByProps').mockResolvedValue(locationDTO)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(LocationStateRepository.prototype, 'createLocation').mockResolvedValue()

      await expect(async () => await callCreateCollection()).rejects.toThrowError(ConflictException)
    })

    it('should throw an InternalServerException because NetworkProvider.doHttpRequest threw InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockRejectedValue(InternalServerException)
      vi.spyOn(LocationStateRepository.prototype, 'createLocation').mockResolvedValue()

      await expect(async () => await callCreateCollection()).rejects.toEqual(InternalServerException)
    })

    it('should throw an InternalServerException because LocationStateRepository.createLocation threw InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(LocationStateRepository.prototype, 'createLocation').mockRejectedValue(InternalServerException)

      await expect(async () => await callCreateCollection()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('updateLocationByUuid', () => {
    async function callUpdateLocationByUuid (): Promise<LocationDTO> {
      return await instance.updateLocationByUuid({
        uuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString,
        active: true,
        visible: true
      })
    }

    it('should be defined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockResolvedValue(locationDTO);
      vi.spyOn(LocationStateRepository.prototype, 'updateLocationByUuid').mockResolvedValue(locationDTO);
      await expect(callUpdateLocationByUuid()).resolves.toBeDefined()
    })

    it('should throw an InternalServerException because LocationStateRepository.findLocationByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockRejectedValue(InternalServerException);
      vi.spyOn(LocationStateRepository.prototype, 'updateLocationByUuid').mockResolvedValue(locationDTO);
      await expect(async () => await callUpdateLocationByUuid()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an NonFoundException because LocationStateRepository.findLocationByUuid threw an NonFoundException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockResolvedValue(undefined);
      vi.spyOn(LocationStateRepository.prototype, 'updateLocationByUuid').mockResolvedValue(locationDTO);
      await expect(async () => await callUpdateLocationByUuid()).rejects.toThrowError(NonFoundException)
    })

    it('should throw an InternalServerException because LocationStateRepository.updateLocationByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockResolvedValue(locationDTO);
      vi.spyOn(LocationStateRepository.prototype, 'updateLocationByUuid').mockRejectedValue(InternalServerException);
      await expect(async () => await callUpdateLocationByUuid()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an NonFoundException because LocationStateRepository.updateLocationByUuid threw an NonFoundException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByUuid').mockResolvedValue(locationDTO);
      vi.spyOn(LocationStateRepository.prototype, 'updateLocationByUuid').mockResolvedValue(undefined);
      await expect(async () => await callUpdateLocationByUuid()).rejects.toThrowError(NonFoundException)
    })
  })
})
