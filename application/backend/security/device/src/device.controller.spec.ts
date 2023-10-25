import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { DeviceController } from './device.controller';
import { type DeviceDTO } from './structs/device.domain';
import { DeviceService } from './device.service';

describe('DeviceController', () => {
  const instance = new DeviceController();

  it('should have an instanceOf DeviceController', () => {
    expect(instance).toBeInstanceOf(DeviceController);
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

  const deviceDTO: DeviceDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    ipAddress: randomString,
    visible: true,
    active: true,
    createdAt: randomDate,
    updatedAt: randomDate
  }

  describe('findDevicesByUserUuid', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, userUuid: randomUuid }
    })

    async function callFindDevices (): Promise<Response> {
      return await instance.findDevicesByUserUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'findDevicesByUserUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindDevices()).resolves.toEqual(new Error());
    })

    it('should return an deviceDTO collection', async () => {
      vi.spyOn(DeviceService.prototype, 'findDevicesByUserUuid').mockResolvedValue([deviceDTO]);
      defineResponseMock(deviceDTO);

      await expect(callFindDevices()).resolves.toEqual(deviceDTO);
    })
  })

  describe('findDeviceByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
    })

    async function callFindDeviceByUuid (): Promise<Response> {
      return await instance.findDeviceByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'findDeviceByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindDeviceByUuid()).resolves.toEqual(new Error());
    })

    it('should return an deviceDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'findDeviceByUuid').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callFindDeviceByUuid()).resolves.toEqual(deviceDTO);
    })
  })

  describe('createDevice', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        userUuid: randomUuid,
        ipAddress: randomString
      }
    })

    async function callCreateDevice (): Promise<Response> {
      return await instance.createDevice(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'createDevice').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateDevice()).resolves.toEqual(new Error());
    })

    it('should return an deviceDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'createDevice').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callCreateDevice()).resolves.toEqual(deviceDTO);
    })
  })

  describe('updateDeviceByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = {
        ...requestMock.body,
        ipAddress: randomString,
        visible: true,
        active: true
      }
    })

    async function callDeviceByUuid (): Promise<Response> {
      return await instance.updateDeviceByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callDeviceByUuid()).resolves.toEqual(new Error());
    })

    it('should return an deviceDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceByUuid').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callDeviceByUuid()).resolves.toEqual(deviceDTO);
    })
  })
})
