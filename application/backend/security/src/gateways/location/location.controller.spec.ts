import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocationController } from './location.controller';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { LocationDTO } from './domain/location.dto';
import { type Request, type Response } from 'express';
import { LocationService } from './location.service';

describe('LocationController', () => {
  const instance = new LocationController();

  it('should have an instanceOf LocationController', () => {
    expect(instance).toBeInstanceOf(LocationController);
  })

  const dummyUuid = new RandomProvider().randomUUID();
  const dummyUserUuid = new RandomProvider().randomUUID();
  const dummyCoordinateX = 'dummyCoordinateX';
  const dummyCoordinateY = 'dummyCoordinateY';
  const dummyEnabled = true;
  const dummyActivated = true;
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const locationDTO = new LocationDTO(
    dummyUuid,
    dummyUserUuid,
    dummyCoordinateX,
    dummyCoordinateY,
    dummyEnabled,
    dummyActivated,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  describe('findLocations', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, userUuid: 'dummyUserUuid' };
      vi.mock('location.service', () => ({
        findLocations: vi.fn()
      }))
    })

    async function callFindLocations (): Promise<Response> {
      return await instance.findLocations(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'findLocations').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callFindLocations()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO collection', async () => {
      vi.spyOn(LocationService.prototype, 'findLocations').mockResolvedValue([locationDTO]);
      defineResponseMock([locationDTO]);

      await expect(callFindLocations()).resolves.toEqual([locationDTO]);
    })
  })

  describe('findLocationByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      vi.mock('location.service', () => ({
        findLocationByUuid: vi.fn()
      }))
    })

    async function callFindLocationByUuid (): Promise<Response> {
      return await instance.findLocationByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'findLocationByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callFindLocationByUuid()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'findLocationByUuid').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callFindLocationByUuid()).resolves.toEqual(locationDTO);
    })
  })

  describe('createLocation', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        userUuid: 'dummyUserUuid',
        coordinateX: 'dummyCoordinateX',
        coordinateY: 'dummyCoordinateY'
      };
      vi.mock('location.service', () => ({
        createLocation: vi.fn()
      }))
    })

    async function callCreateLocation (): Promise<Response> {
      return await instance.createLocation(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'createLocation').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callCreateLocation()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'createLocation').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callCreateLocation()).resolves.toEqual(locationDTO);
    })
  })

  describe('updateCoordinatesByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      requestMock.body = {
        ...requestMock.body,
        coordinateX: 'dummyCoordinateX',
        coordinateY: 'dummyCoordinateY'
      };
      vi.mock('location.service', () => ({
        updateCoordinatesByUuid: vi.fn()
      }))
    })

    async function callUpdateCoordinatesByUuid (): Promise<Response> {
      return await instance.updateCoordinatesByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'updateCoordinatesByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callUpdateCoordinatesByUuid()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'updateCoordinatesByUuid').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callUpdateCoordinatesByUuid()).resolves.toEqual(locationDTO);
    })
  })

  describe('updateStatusByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      requestMock.body = {
        ...requestMock.body,
        enabled: true
      };
      vi.mock('location.service', () => ({
        updateStatusByUuid: vi.fn()
      }))
    })

    async function callUpdateStatusByUuid (): Promise<Response> {
      return await instance.updateStatusByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'updateStatusByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callUpdateStatusByUuid()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'updateStatusByUuid').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callUpdateStatusByUuid()).resolves.toEqual(locationDTO);
    })
  })

  describe('updateActivityByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      requestMock.body = {
        ...requestMock.body,
        activated: true
      };
      vi.mock('location.service', () => ({
        updateActivityByUuid: vi.fn()
      }))
    })

    async function callUpdateActivityByUuid (): Promise<Response> {
      return await instance.updateActivityByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'updateActivityByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callUpdateActivityByUuid()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'updateActivityByUuid').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callUpdateActivityByUuid()).resolves.toEqual(locationDTO);
    })
  })
})
