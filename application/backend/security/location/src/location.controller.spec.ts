import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocationController } from './location.controller';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type LocationDTO } from './structs/location.domain';
import { LocationService } from './location.service';

describe('LocationController', () => {
  const instance = new LocationController();

  it('should have an instanceOf LocationController', () => {
    expect(instance).toBeInstanceOf(LocationController);
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

  describe('findLocations', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, userUuid: randomUuid }
    })

    async function callFindLocations (): Promise<Response> {
      return await instance.findLocationsByUserUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'findLocationsByUserUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindLocations()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO collection', async () => {
      vi.spyOn(LocationService.prototype, 'findLocationsByUserUuid').mockResolvedValue([locationDTO]);
      defineResponseMock(locationDTO);

      await expect(callFindLocations()).resolves.toEqual(locationDTO);
    })
  })

  describe('findLocationByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
    })

    async function callFindLocationByUuid (): Promise<Response> {
      return await instance.findLocationByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'findLocationByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
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
        userUuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString
      }
    })

    async function callCreateLocation (): Promise<Response> {
      return await instance.createLocation(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'createLocation').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateLocation()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'createLocation').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callCreateLocation()).resolves.toEqual(locationDTO);
    })
  })

  describe('updateLocationByUuid', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        uuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString,
        visible: true,
        active: true
      }
    })

    async function callUpdateLocationByUuid (): Promise<Response> {
      return await instance.updateLocationByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(LocationService.prototype, 'updateLocationByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateLocationByUuid()).resolves.toEqual(new Error());
    })

    it('should return an LocationDTO', async () => {
      vi.spyOn(LocationService.prototype, 'updateLocationByUuid').mockResolvedValue(locationDTO);
      defineResponseMock(locationDTO);

      await expect(callUpdateLocationByUuid()).resolves.toEqual(locationDTO);
    })
  })
})
