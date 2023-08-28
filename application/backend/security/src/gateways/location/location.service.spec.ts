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

  describe('updateCoordinatesByUuid', () => {})
  describe('updateStatusByUuid', () => {})
  describe('updateActivityByUuid', () => {})
})
