import { describe, it, expect, vi } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type DeviceDTO } from './structs/device.domain';
import { DeviceService } from './device.service';
import { DeviceStateRepository } from './repositories/device-state.repository';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';

describe('DeviceService', () => {
  const instance = new DeviceService();

  it('should have an instanceOf DeviceService', () => {
    expect(instance).toBeInstanceOf(DeviceService);
  })

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomUuid = randomProvider.randomUUID();
  const randomDate = new Date().toISOString();

  const deviceDTO: DeviceDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    ipAddress: randomString,
    platform: randomString,
    model: randomString,
    visible: true,
    active: true,
    createdAt: randomDate,
    updatedAt: randomDate
  }

  describe('findDevicesByUserUuidRequest', () => {
    async function callFindDevicesByUserUuid (): Promise<DeviceDTO[]> {
      return await instance.findDevicesByUserUuid({
        userUuid: randomUuid
      })
    }

    it('should have response toEqual a DeviceDTO collection', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUserUuid').mockResolvedValue([deviceDTO]);
      await expect(callFindDevicesByUserUuid()).resolves.toEqual([deviceDTO])
    })

    it('should have an InternalServerException because DeviceStateRepository.findDevices threw InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUserUuid').mockRejectedValue(InternalServerException);
      await expect(callFindDevicesByUserUuid()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('findDeviceByUuid', () => {
    async function callFindDeviceByUuid (): Promise<DeviceDTO> {
      return await instance.findDeviceByUuid({
        uuid: randomUuid
      })
    }

    it('should have response toEqual a DeviceDTO', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockResolvedValue(deviceDTO);
      await expect(callFindDeviceByUuid()).resolves.toEqual(deviceDTO)
    })

    it('should have an InternalServerException because DeviceStateRepository.findDevices threw InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockRejectedValue(InternalServerException);
      await expect(callFindDeviceByUuid()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('createDevice', () => {
    async function callCreateDevice (): Promise<DeviceDTO> {
      return await instance.createDevice({
        userUuid: randomUuid,
        ipAddress: randomString,
        platform: randomString,
        model: randomString
      })
    }

    it('should have a response to be defined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DeviceStateRepository.prototype, 'createDevice').mockResolvedValue()

      await expect(callCreateDevice()).resolves.toBeDefined()
    })

    it('should throw an InternalServerException because DeviceStateRepository.findDeviceByProps threw InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProps').mockRejectedValue(InternalServerException)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DeviceStateRepository.prototype, 'createDevice').mockResolvedValue()

      await expect(async () => await callCreateDevice()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an ConflictException because DeviceStateRepository.findDeviceByProps threw ConflictException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProps').mockResolvedValue(deviceDTO)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DeviceStateRepository.prototype, 'createDevice').mockResolvedValue()

      await expect(async () => await callCreateDevice()).rejects.toThrowError(ConflictException)
    })

    it('should throw an InternalServerException because NetworkProvider.doHttpRequest threw InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockRejectedValue(InternalServerException)
      vi.spyOn(DeviceStateRepository.prototype, 'createDevice').mockResolvedValue()

      await expect(async () => await callCreateDevice()).rejects.toEqual(InternalServerException)
    })

    it('should throw an InternalServerException because DeviceStateRepository.createDevice threw InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(DeviceStateRepository.prototype, 'createDevice').mockRejectedValue(InternalServerException)

      await expect(async () => await callCreateDevice()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('updateDeviceByUuid', () => {
    async function callUpdateDeviceByUuid (): Promise<DeviceDTO> {
      return await instance.updateDeviceByUuid({
        uuid: randomUuid,
        ipAddress: randomString,
        platform: randomString,
        model: randomString,
        active: true,
        visible: true
      })
    }

    it('should be defined', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockResolvedValue(deviceDTO);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockResolvedValue(deviceDTO);
      await expect(callUpdateDeviceByUuid()).resolves.toBeDefined()
    })

    it('should throw an InternalServerException because DeviceStateRepository.findDeviceByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockRejectedValue(InternalServerException);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockResolvedValue(deviceDTO);
      await expect(async () => await callUpdateDeviceByUuid()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an NonFoundException because DeviceStateRepository.findDeviceByUuid threw an NonFoundException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockResolvedValue(undefined);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockResolvedValue(deviceDTO);
      await expect(async () => await callUpdateDeviceByUuid()).rejects.toThrowError(NonFoundException)
    })

    it('should throw an InternalServerException because DeviceStateRepository.updateDeviceByUuid threw an InternalServerException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockResolvedValue(deviceDTO);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockRejectedValue(InternalServerException);
      await expect(async () => await callUpdateDeviceByUuid()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an NonFoundException because DeviceStateRepository.updateDeviceByUuid threw an NonFoundException', async () => {
      vi.spyOn(DeviceStateRepository.prototype, 'findDeviceByUuid').mockResolvedValue(deviceDTO);
      vi.spyOn(DeviceStateRepository.prototype, 'updateDeviceByUuid').mockResolvedValue(undefined);
      await expect(async () => await callUpdateDeviceByUuid()).rejects.toThrowError(NonFoundException)
    })
  })
})
