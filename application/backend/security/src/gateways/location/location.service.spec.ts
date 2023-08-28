import { describe, expect, it, vi } from 'vitest';
import { LocationService } from './location.service';
import { FindLocationByUuidRequest } from './requests/find-location-by-uuid.request';
import { LocationDTO } from './domain/location.dto';
import { LocationStateRepository } from './repositories/location-state.repository';
import { LocationEntity } from './domain/location.entity';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { CreateLocationRequest } from './requests/create-location.request';
import { ConflictException } from '@meisi-thesis/application-backend-shared/src/exceptions/conflict.exception';
import { UpdateCoordinatesByUuidRequest } from './requests/update-coordinates-by-uuid.request';
import { UpdateStatusByUuidRequest } from './requests/update-status-by-uuid.request';
import { UpdateActivityByUuidRequest } from './requests/update-activity-by-uuid.request';

describe('LocationService', () => {
  const instance = new LocationService();

  it('should have an instanceOf LocationService', () => {
    expect(instance).toBeInstanceOf(LocationService);
  })

  const locationEntity = new LocationEntity(
    'dummyUuid',
    'dummyUserUuid',
    'dummyCoordinateX',
    'dummyCoordinateY',
    true,
    true,
    new Date().toISOString(),
    new Date().toISOString()
  );

  describe('findLocationByUuid', () => {
    const findLocationByUuidRequest = new FindLocationByUuidRequest(
      'dummyUuid'
    );

    async function callFindLocationByUuid (): Promise<LocationDTO> {
      return await instance.findLocationByUuid(findLocationByUuidRequest);
    }

    it('should return an instanceOf LocationDTO', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);

      await expect(callFindLocationByUuid()).resolves.toBeInstanceOf(LocationDTO);
    })

    it('should throw an NonFoundException because LocationRepository.FindOneByUuid returned undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindLocationByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because LocationRepository.FindOneByUuid threw an exception', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());

      await expect(async () => await callFindLocationByUuid()).rejects.toThrow(InternalServerException);
    })
  })

  describe('createLocation', () => {
    const createLocationRequest = new CreateLocationRequest(
      'dummyUuid',
      'dummyCoordinateX',
      'dummyCoordinateY'
    );

    async function callCreateLocation (): Promise<LocationDTO> {
      return await instance.createLocation(createLocationRequest);
    }

    it('should have an instanceOf LocationDTO', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByCoordinatesWithUserUuid').mockResolvedValue(undefined);

      await expect(callCreateLocation()).resolves.toBeInstanceOf(LocationDTO);
    })

    it('should throw a ConflictException because Repository.findLocationByCoordinatesWithUserUuid returned an LocationEntity', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByCoordinatesWithUserUuid').mockResolvedValue(locationEntity);

      await expect(async () => await callCreateLocation()).rejects.toThrow(ConflictException);
    })

    it('should throw a InternalServerException because Repository.findLocationByCoordinatesWithUserUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findLocationByCoordinatesWithUserUuid').mockRejectedValue(InternalServerException);

      await expect(async () => await callCreateLocation()).rejects.toThrow(InternalServerException);
    })

    it('should throw a InternalServerException because Repository.createOne threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'createOne').mockRejectedValue(InternalServerException);

      await expect(async () => await callCreateLocation()).rejects.toThrow(InternalServerException);
    })
  })

  describe('updateCoordinatesByUuid', () => {
    const updateCoordinatesByUuidRequest = new UpdateCoordinatesByUuidRequest(
      'dummyUuid',
      'dummyCoordinatesX',
      'dummyCoordinatesY'
    );

    async function callUpdateCoordinatesByUuid (): Promise<LocationDTO> {
      return await instance.updateCoordinatesByUuid(updateCoordinatesByUuidRequest);
    }

    it('should have an instanceOf LocationDTO', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      await expect(callUpdateCoordinatesByUuid()).resolves.toBeInstanceOf(LocationDTO);
    })

    it('should throw a NonFoundException because LocationStateRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(callUpdateCoordinatesByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw a InternalServerException because LocationStateRepository.findOneByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateCoordinatesByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a InternalServerException because LocationStateRepository.updateCoordinatesByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      vi.spyOn(LocationStateRepository.prototype, 'updateCoordinatesByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateCoordinatesByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a NonFoundException because LocationStateRepository.updateCoordinatesByUuid returned an undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      vi.spyOn(LocationStateRepository.prototype, 'updateCoordinatesByUuid').mockResolvedValue(undefined);
      await expect(callUpdateCoordinatesByUuid()).rejects.toThrow(NonFoundException);
    })
  })

  describe('updateStatusByUuid', () => {
    const updateStatusByUuidRequest = new UpdateStatusByUuidRequest(
      'dummyUuid',
      true
    );

    async function callUpdateStatusByUuid (): Promise<LocationDTO> {
      return await instance.updateStatusByUuid(updateStatusByUuidRequest);
    }

    it('should have an instanceOf LocationDTO', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      await expect(callUpdateStatusByUuid()).resolves.toBeInstanceOf(LocationDTO);
    })

    it('should throw a NonFoundException because LocationStateRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(callUpdateStatusByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw a InternalServerException because LocationStateRepository.findOneByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateStatusByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a InternalServerException because LocationStateRepository.updateStatusByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      vi.spyOn(LocationStateRepository.prototype, 'updateStatusByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateStatusByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a NonFoundException because LocationStateRepository.updateStatusByUuid returned an undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      vi.spyOn(LocationStateRepository.prototype, 'updateStatusByUuid').mockResolvedValue(undefined);
      await expect(callUpdateStatusByUuid()).rejects.toThrow(NonFoundException);
    })
  })

  describe('updateActivityByUuid', () => {
    const updateActivityByUuidRequest = new UpdateActivityByUuidRequest(
      'dummyUuid',
      true
    );

    async function callUpdateActivityByUuid (): Promise<LocationDTO> {
      return await instance.updateActivityByUuid(updateActivityByUuidRequest);
    }

    it('should have an instanceOf LocationDTO', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      await expect(callUpdateActivityByUuid()).resolves.toBeInstanceOf(LocationDTO);
    })

    it('should throw a NonFoundException because LocationStateRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(callUpdateActivityByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw a InternalServerException because LocationStateRepository.findOneByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateActivityByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a InternalServerException because LocationStateRepository.updateActivityByUuid threw an InternalServerException', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      vi.spyOn(LocationStateRepository.prototype, 'updateActivityByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateActivityByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a NonFoundException because LocationStateRepository.updateActivityByUuid returned an undefined', async () => {
      vi.spyOn(LocationStateRepository.prototype, 'findOneByUuid').mockResolvedValue(locationEntity);
      vi.spyOn(LocationStateRepository.prototype, 'updateActivityByUuid').mockResolvedValue(undefined);
      await expect(callUpdateActivityByUuid()).rejects.toThrow(NonFoundException);
    })
  })
})
