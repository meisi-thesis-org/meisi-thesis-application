import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DeviceController } from './device.controller';
import { type Request, type Response } from 'express';
import { DeviceService } from './device.service';
import { DeviceDTO } from './domain/device.dto';

describe('DeviceController', () => {
  const instance = new DeviceController();

  it('should have an instanceOf DeviceController', () => {
    expect(instance).toBeInstanceOf(DeviceController);
  })

  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyIpAddress = 'dummyIpAddress';
  const dummyPlatform = 'dummyPlatform';
  const dummyModel = 'dummyModel';
  const dummyEnabled = true;
  const dummyActivated = true;
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const deviceDTO = new DeviceDTO(
    dummyUuid,
    dummyUserUuid,
    dummyIpAddress,
    dummyPlatform,
    dummyModel,
    dummyEnabled,
    dummyActivated,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  describe('findDevices', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, userUuid: 'dummyUserUuid' };
      vi.mock('location.service', () => ({
        findDevices: vi.fn()
      }))
    })

    async function callFindDevices (): Promise<Response> {
      return await instance.findDevices(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'findDevices').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callFindDevices()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO collection', async () => {
      vi.spyOn(DeviceService.prototype, 'findDevices').mockResolvedValue([deviceDTO]);
      defineResponseMock([deviceDTO]);

      await expect(callFindDevices()).resolves.toEqual([deviceDTO]);
    })
  })

  describe('findDeviceByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      vi.mock('location.service', () => ({
        findDeviceByUuid: vi.fn()
      }))
    })

    async function callFindDeviceByUuid (): Promise<Response> {
      return await instance.findDeviceByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'findDeviceByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callFindDeviceByUuid()).resolves.toEqual(new Error());
    })

    it('should return an DeviceDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'findDeviceByUuid').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callFindDeviceByUuid()).resolves.toEqual(deviceDTO);
    })
  })

  describe('createDevice', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        userUuid: 'dummyUserUuid',
        coordinateX: 'dummyCoordinateX',
        coordinateY: 'dummyCoordinateY'
      };
      vi.mock('location.service', () => ({
        createDevice: vi.fn()
      }))
    })

    async function callCreateDevice (): Promise<Response> {
      return await instance.createDevice(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'createDevice').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callCreateDevice()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'createDevice').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callCreateDevice()).resolves.toEqual(deviceDTO);
    })
  })

  describe('updateDeviceByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      requestMock.body = {
        ...requestMock.body,
        coordinateX: 'dummyCoordinateX',
        coordinateY: 'dummyCoordinateY'
      };
      vi.mock('location.service', () => ({
        updateDeviceByUuid: vi.fn()
      }))
    })

    async function callUpdateDeviceByUuid (): Promise<Response> {
      return await instance.updateDeviceByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callUpdateDeviceByUuid()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceByUuid').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callUpdateDeviceByUuid()).resolves.toEqual(deviceDTO);
    })
  })

  describe('updateDeviceStatusByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      requestMock.body = {
        ...requestMock.body,
        enabled: true
      };
      vi.mock('location.service', () => ({
        updateDeviceStatusByUuid: vi.fn()
      }))
    })

    async function callUpdateDevicesStatusByUuid (): Promise<Response> {
      return await instance.updateDeviceStatusByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceStatusByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callUpdateDevicesStatusByUuid()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceStatusByUuid').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callUpdateDevicesStatusByUuid()).resolves.toEqual(deviceDTO);
    })
  })

  describe('updateDeviceActivityByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' };
      requestMock.body = {
        ...requestMock.body,
        activated: true
      };
      vi.mock('location.service', () => ({
        updateDeviceActivityByUuid: vi.fn()
      }))
    })

    async function callUpdateDeviceActivityByUuid (): Promise<Response> {
      return await instance.updateDeviceActivityByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceActivityByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error())

      await expect(callUpdateDeviceActivityByUuid()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(DeviceService.prototype, 'updateDeviceActivityByUuid').mockResolvedValue(deviceDTO);
      defineResponseMock(deviceDTO);

      await expect(callUpdateDeviceActivityByUuid()).resolves.toEqual(deviceDTO);
    })
  })
})
