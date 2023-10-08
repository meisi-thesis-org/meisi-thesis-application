import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NetworkController } from './network.controller';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type NetworkDTO } from './structs/network.domain';
import { NetworkService } from './network.service';

describe('NetworkController', () => {
  const instance = new NetworkController();

  it('should have an instanceOf NetworkController', () => {
    expect(instance).toBeInstanceOf(NetworkController);
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

  const networkDTO: NetworkDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    coordinateX: randomString,
    coordinateY: randomString,
    visible: true,
    active: true,
    createdAt: randomDate,
    updatedAt: randomDate
  }

  describe('findNetworks', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, userUuid: randomUuid }
    })

    async function callFindNetworks (): Promise<Response> {
      return await instance.findNetworksByUserUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(NetworkService.prototype, 'findNetworksByUserUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindNetworks()).resolves.toEqual(new Error());
    })

    it('should return an NetworkDTO collection', async () => {
      vi.spyOn(NetworkService.prototype, 'findNetworksByUserUuid').mockResolvedValue([networkDTO]);
      defineResponseMock(networkDTO);

      await expect(callFindNetworks()).resolves.toEqual(networkDTO);
    })
  })

  describe('findNetworkByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
    })

    async function callFindNetworkByUuid (): Promise<Response> {
      return await instance.findNetworkByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(NetworkService.prototype, 'findNetworkByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindNetworkByUuid()).resolves.toEqual(new Error());
    })

    it('should return an NetworkDTO', async () => {
      vi.spyOn(NetworkService.prototype, 'findNetworkByUuid').mockResolvedValue(networkDTO);
      defineResponseMock(networkDTO);

      await expect(callFindNetworkByUuid()).resolves.toEqual(networkDTO);
    })
  })

  describe('createNetwork', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        userUuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString
      }
    })

    async function callCreateNetwork (): Promise<Response> {
      return await instance.createNetwork(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(NetworkService.prototype, 'createNetwork').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateNetwork()).resolves.toEqual(new Error());
    })

    it('should return an NetworkDTO', async () => {
      vi.spyOn(NetworkService.prototype, 'createNetwork').mockResolvedValue(networkDTO);
      defineResponseMock(networkDTO);

      await expect(callCreateNetwork()).resolves.toEqual(networkDTO);
    })
  })

  describe('updateNetworkByUuid', () => {
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

    async function callUpdateNetworkByUuid (): Promise<Response> {
      return await instance.updateNetworkByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(NetworkService.prototype, 'updateNetworkByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateNetworkByUuid()).resolves.toEqual(new Error());
    })

    it('should return an NetworkDTO', async () => {
      vi.spyOn(NetworkService.prototype, 'updateNetworkByUuid').mockResolvedValue(networkDTO);
      defineResponseMock(networkDTO);

      await expect(callUpdateNetworkByUuid()).resolves.toEqual(networkDTO);
    })
  })
})
