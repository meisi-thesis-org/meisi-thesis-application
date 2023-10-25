import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { type UpdateDeviceByUuidRequest, type CreateDeviceRequest, type FindDeviceByUuidRequest, type FindDevicesByUserUuidRequest } from './structs/device.request';
import { deviceMapper, type DeviceDTO, type DeviceEntity } from './structs/device.domain';
import { DeviceStateRepository } from './repositories/device-state.repository';
import { type DeviceRepository } from './device.repository';

export class DeviceService {
  private readonly repository: DeviceRepository = new DeviceStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findDevicesByUserUuid (
    findDeviceByUserUuidRequest: FindDevicesByUserUuidRequest
  ): Promise<DeviceDTO[]> {
    const foundDevices = await this.repository
      .findDeviceByUserUuid(findDeviceByUserUuidRequest.userUuid)
      .catch(() => { throw new InternalServerException(); })

    const mappedDevices = new Array<DeviceDTO>();

    for (const foundDevice of foundDevices) {
      mappedDevices.push(deviceMapper(foundDevice));
    }

    return mappedDevices;
  }

  public async findDeviceByUuid (
    findDeviceByUuidRequest: FindDeviceByUuidRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findDeviceByUuid(findDeviceByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundDevice === undefined) throw new NonFoundException();

    return deviceMapper(foundDevice);
  }

  public async createDevice (
    createDeviceRequest: CreateDeviceRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findDeviceByProps(
        createDeviceRequest.userUuid,
        createDeviceRequest.ipAddress
      ).catch(() => { throw new InternalServerException(); })

    if (foundDevice !== undefined) throw new ConflictException();

    await this.networkProvider.doHttpRequest(
      '8000',
      'security/users',
      'GET',
      undefined,
      { uuid: createDeviceRequest.userUuid }
    )

    const createDevice: DeviceEntity = {
      uuid: this.randomProvider.randomUUID(),
      userUuid: createDeviceRequest.userUuid,
      ipAddress: createDeviceRequest.ipAddress,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toString()
    }

    await this.repository
      .createDevice(createDevice)
      .catch(() => { throw new InternalServerException(); })

    return deviceMapper(createDevice);
  }

  public async updateDeviceByUuid (
    updateDeviceByUuidRequest: UpdateDeviceByUuidRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findDeviceByUuid(updateDeviceByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundDevice === undefined) throw new NonFoundException();

    const toUpdateDevice: Omit<DeviceEntity, 'uuid' | 'userUuid' | 'createdAt'> = {
      ipAddress: updateDeviceByUuidRequest.ipAddress ?? foundDevice.ipAddress,
      visible: updateDeviceByUuidRequest.visible ?? foundDevice.visible,
      active: updateDeviceByUuidRequest.active ?? foundDevice.active,
      updatedAt: new Date().toISOString()
    }

    const updateDevice = await this.repository
      .updateDeviceByUuid(foundDevice.uuid, toUpdateDevice)
      .catch(() => { throw new InternalServerException(); })

    if (updateDevice === undefined) throw new NonFoundException();

    return deviceMapper(updateDevice);
  }
}
