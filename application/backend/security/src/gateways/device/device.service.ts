import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { type DeviceDTO } from './domain/device.dto';
import { type CreateDeviceRequest } from './requests/create-device.request';
import { type FindDeviceByUuidRequest } from './requests/find-device-by-uuid.request';
import { type FindDevicesRequest } from './requests/find-devices.request';
import { type UpdateDeviceActivityByUuidRequest } from './requests/update-device-activity-by-uuid.request';
import { type UpdateDeviceByUuidRequest } from './requests/update-device-by-uuid.request';
import { type UpdateDeviceStatusByUuidRequest } from './requests/update-device-status-by-uuid.request';
import { type DeviceRepository } from './device.repository';
import { DeviceMapper } from './domain/device.mapper';
import { DeviceStateRepository } from './repositories/device-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-shared/src/exceptions/conflict.exception';
import { DeviceEntity } from './domain/device.entity';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

export class DeviceService {
  private readonly repository: DeviceRepository;
  private readonly mapper: DeviceMapper;
  private readonly randomProvider: RandomProvider;

  public constructor () {
    this.repository = new DeviceStateRepository();
    this.mapper = new DeviceMapper();
    this.randomProvider = new RandomProvider();
  }

  public async findDevices (
    findDevicesRequest: FindDevicesRequest
  ): Promise<DeviceDTO[]> {
    const Devices = await this.repository
      .findDevicesByQueryParams(
        findDevicesRequest.getUserUuid(),
        findDevicesRequest.getIpAddress(),
        findDevicesRequest.getPlatform(),
        findDevicesRequest.getModel()
      ).catch(() => {
        throw new InternalServerException();
      })

    const mappedDevices: DeviceDTO[] = [];

    for (const Device of Devices) {
      mappedDevices.push(this.mapper.map(Device));
    }

    return mappedDevices;
  }

  public async findDeviceByUuid (
    findDeviceByUuidRequest: FindDeviceByUuidRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findOneByUuid(findDeviceByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundDevice === undefined) throw new NonFoundException();

    return this.mapper.map(foundDevice);
  }

  public async createDevice (
    createDeviceRequest: CreateDeviceRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findDeviceByProperties(
        createDeviceRequest.getUserUuid(),
        createDeviceRequest.getIpAddress(),
        createDeviceRequest.getPlatform(),
        createDeviceRequest.getModel()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (foundDevice !== undefined) throw new ConflictException();

    const createdDevice = new DeviceEntity(
      this.randomProvider.randomUUID(),
      createDeviceRequest.getUserUuid(),
      createDeviceRequest.getIpAddress(),
      createDeviceRequest.getPlatform(),
      createDeviceRequest.getModel(),
      true,
      true,
      new Date().toISOString(),
      new Date().toISOString()
    )

    await this.repository.createOne(createdDevice).catch(() => {
      throw new InternalServerException();
    })

    return this.mapper.map(createdDevice);
  }

  public async updateDeviceByUuid (
    updateDeviceByUuidRequest: UpdateDeviceByUuidRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findOneByUuid(updateDeviceByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundDevice === undefined) throw new NonFoundException();

    const updatedDevice = await this.repository
      .updateDeviceByUuid(
        updateDeviceByUuidRequest.getUuid(),
        updateDeviceByUuidRequest.getIpAddress(),
        updateDeviceByUuidRequest.getPlatform(),
        updateDeviceByUuidRequest.getModel()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (updatedDevice === undefined) throw new NonFoundException();

    return this.mapper.map(updatedDevice);
  }

  public async updateDeviceStatusByUuid (
    updateDeviceStatusByUuidRequest: UpdateDeviceStatusByUuidRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findOneByUuid(updateDeviceStatusByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundDevice === undefined) throw new NonFoundException();

    const updatedDevice = await this.repository
      .updateDeviceStatusByUuid(
        updateDeviceStatusByUuidRequest.getUuid(),
        updateDeviceStatusByUuidRequest.getEnabled()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (updatedDevice === undefined) throw new NonFoundException();

    return this.mapper.map(updatedDevice);
  }

  public async updateDeviceActivityByUuid (
    updateDeviceActivityByUuidRequest: UpdateDeviceActivityByUuidRequest
  ): Promise<DeviceDTO> {
    const foundDevice = await this.repository
      .findOneByUuid(updateDeviceActivityByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundDevice === undefined) throw new NonFoundException();

    const updatedDevice = await this.repository
      .updateDeviceActivityByUuid(
        updateDeviceActivityByUuidRequest.getUuid(),
        updateDeviceActivityByUuidRequest.getActivated()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (updatedDevice === undefined) throw new NonFoundException();

    return this.mapper.map(updatedDevice);
  }
}
