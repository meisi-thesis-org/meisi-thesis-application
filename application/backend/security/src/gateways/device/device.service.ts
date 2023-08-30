import { type DeviceDTO } from './domain/device.dto';
import { type CreateDeviceRequest } from './requests/create-device.request';
import { type FindDeviceByUuidRequest } from './requests/find-device-by-uuid.request';
import { type FindDevicesRequest } from './requests/find-devices.request';
import { type UpdateDeviceActivityByUuidRequest } from './requests/update-device-activity-by-uuid.request';
import { type UpdateDeviceByUuidRequest } from './requests/update-device-by-uuid.request';
import { type UpdateDeviceStatusByUuidRequest } from './requests/update-device-status-by-uuid.request';

export class DeviceService {
  public async findDevices (findDevicesRequest: FindDevicesRequest): Promise<DeviceDTO[]> {
    throw new Error('Method not implemented.');
  }

  public async findDeviceByUuid (findDeviceByUuidRequest: FindDeviceByUuidRequest): Promise<DeviceDTO> {
    throw new Error('Method not implemented.');
  }

  public async createDevice (createDeviceRequest: CreateDeviceRequest): Promise<DeviceDTO> {
    throw new Error('Method not implemented.');
  }

  public async updateDeviceByUuid (updateDeviceByUuidRequest: UpdateDeviceByUuidRequest): Promise<DeviceDTO> {
    throw new Error('Method not implemented.');
  }

  public async updateDeviceStatusByUuid (updateDeviceStatusByUuidRequest: UpdateDeviceStatusByUuidRequest): Promise<DeviceDTO> {
    throw new Error('Method not implemented.');
  }

  public async updateDeviceActivityByUuid (updateDeviceActivityByUuidRequest: UpdateDeviceActivityByUuidRequest): Promise<DeviceDTO> {
    throw new Error('Method not implemented.');
  }
}
