import { describe, expect, it, vi } from 'vitest';
import { DeviceService } from './device.service';
import { FindDevicesRequest } from './requests/find-devices.request';
import { DeviceDTO } from './domain/device.dto';
import { DeviceStateRepository } from './repositories/device-state.repository';
import { DeviceEntity } from './domain/device.entity';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { FindDeviceByUuidRequest } from './requests/find-device-by-uuid.request';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { CreateDeviceRequest } from './requests/create-device.request';
import { ConflictException } from '@meisi-thesis/application-backend-shared/src/exceptions/conflict.exception';
import { UpdateDeviceByUuidRequest } from './requests/update-device-by-uuid.request';
import { UpdateDeviceStatusByUuidRequest } from './requests/update-device-status-by-uuid.request';
import { UpdateDeviceActivityByUuidRequest } from './requests/update-device-activity-by-uuid.request';

describe('DeviceService', () => {
  const instance = new DeviceService();

  it('should have an instanceOf DeviceService', () => {
    expect(instance).toBeInstanceOf(DeviceService);
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

  const deviceEntity = new DeviceEntity(
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

  describe('findDevices', () => {
    const findDevicesRequest = new FindDevicesRequest(
      undefined,
      undefined,
      undefined,
      undefined
    );

    async function callFindDevices (): Promise<DeviceDTO[]> {
      return await instance.findDevices(findDevicesRequest);
    }

    it('should return a DeviceDTO collection', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDevicesByQueryParams').mockResolvedValue([deviceEntity]);
      await expect(callFindDevices()).resolves.toEqual([deviceEntity])
    })

    it('should thow an InternalServerException because DeviceStateRepository.findDevicesByQueryParams threw InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDevicesByQueryParams').mockRejectedValue(new InternalServerException());
      await expect(callFindDevices()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findDeviceByUuid', () => {
    const findDeviceByUuidRequest = new FindDeviceByUuidRequest(
      'dummyUuid'
    );

    async function callFindDeviceByUuid (): Promise<DeviceDTO> {
      return await instance.findDeviceByUuid(findDeviceByUuidRequest);
    }

    it('should return an instanceOf DeviceDTO', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);

      await expect(callFindDeviceByUuid()).resolves.toBeInstanceOf(DeviceDTO);
    })

    it('should throw an NonFoundException because DeviceStateRepository.FindOneByUuid returned undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindDeviceByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because DeviceStateRepository.FindOneByUuid threw an exception', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());

      await expect(async () => await callFindDeviceByUuid()).rejects.toThrow(InternalServerException);
    })
  })

  describe('createDevice', () => {
    const createDeviceRequest = new CreateDeviceRequest(
      'dummyUserUuid',
      'dummyIpAddress',
      'dummyPlatform',
      'dummyModel'
    );

    async function callCreateDevice (): Promise<DeviceDTO> {
      return await instance.createDevice(createDeviceRequest);
    }

    it('should have an instanceOf DeviceDTO', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProperties').mockResolvedValue(undefined);

      await expect(callCreateDevice()).resolves.toBeInstanceOf(DeviceDTO);
    })

    it('should throw a ConflictException because Repository.findDeviceByProperties returned an ConflictException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProperties').mockResolvedValue(deviceEntity);

      await expect(async () => await callCreateDevice()).rejects.toThrow(ConflictException);
    })

    it('should throw a InternalServerException because Repository.findDeviceByProperties threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProperties').mockRejectedValue(InternalServerException);

      await expect(async () => await callCreateDevice()).rejects.toThrow(InternalServerException);
    })

    it('should throw a InternalServerException because Repository.createOne threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'createOne').mockRejectedValue(InternalServerException);

      await expect(async () => await callCreateDevice()).rejects.toThrow(InternalServerException);
    })
  })

  describe('updateDeviceByUuid', () => {
    const updateDeviceByUuidRequest = new UpdateDeviceByUuidRequest(
      'dummyUuid',
      'dummyIpAddress',
      'dummyPlatform',
      'dummyModel'
    );

    async function callUpdateDeviceByUuid (): Promise<DeviceDTO> {
      return await instance.updateDeviceByUuid(updateDeviceByUuidRequest);
    }

    it('should have an instanceOf DeviceDTO', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      await expect(callUpdateDeviceByUuid()).resolves.toBeInstanceOf(DeviceDTO);
    })

    it('should throw a NonFoundException because DeviceStateRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(callUpdateDeviceByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because DeviceStateRepository.findOneByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateDeviceByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an InternalServerException because DeviceStateRepository.updateDeviceByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateDeviceByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a NonFoundException because DeviceStateRepository.updateDeviceByUuid returned an undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockResolvedValue(undefined);
      await expect(callUpdateDeviceByUuid()).rejects.toThrow(NonFoundException);
    })
  })

  describe('updateDeviceStatusByUuid', () => {
    const updateDeviceStatusByUuidRequest = new UpdateDeviceStatusByUuidRequest(
      'dummyUuid',
      true
    );

    async function callUpdateDeviceStatusByUuid (): Promise<DeviceDTO> {
      return await instance.updateDeviceStatusByUuid(updateDeviceStatusByUuidRequest);
    }

    it('should have an instanceOf DeviceDTO', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      await expect(callUpdateDeviceStatusByUuid()).resolves.toBeInstanceOf(DeviceDTO);
    })

    it('should throw a NonFoundException because DeviceStateRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(callUpdateDeviceStatusByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because DeviceStateRepository.findOneByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateDeviceStatusByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an InternalServerException because DeviceStateRepository.updateDeviceStatusByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceStatusByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateDeviceStatusByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a NonFoundException because DeviceStateRepository.updateDeviceStatusByUuid returned an undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceStatusByUuid').mockResolvedValue(undefined);
      await expect(callUpdateDeviceStatusByUuid()).rejects.toThrow(NonFoundException);
    })
  })

  describe('updateDeviceActivityByUuid', () => {
    const updateDeviceActivityByUuid = new UpdateDeviceActivityByUuidRequest(
      'dummyUuid',
      true
    );

    async function callUpdateDeviceActivityByUuid (): Promise<DeviceDTO> {
      return await instance.updateDeviceActivityByUuid(updateDeviceActivityByUuid);
    }

    it('should have an instanceOf DeviceDTO', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      await expect(callUpdateDeviceActivityByUuid()).resolves.toBeInstanceOf(DeviceDTO);
    })

    it('should throw a NonFoundException because DeviceStateRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(callUpdateDeviceActivityByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw a InternalServerException because DeviceStateRepository.findOneByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateDeviceActivityByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a InternalServerException because DeviceStateRepository.updateDeviceActivityByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceActivityByUuid').mockRejectedValue(new InternalServerException());
      await expect(callUpdateDeviceActivityByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw a NonFoundException because DeviceStateRepository.updateDeviceActivityByUuid returned an undefined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(deviceEntity);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceActivityByUuid').mockResolvedValue(undefined);
      await expect(callUpdateDeviceActivityByUuid()).rejects.toThrow(NonFoundException);
    })
  })
})
