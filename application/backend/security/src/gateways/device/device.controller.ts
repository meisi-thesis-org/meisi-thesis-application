import { type Request, type Response } from 'express';
import { DeviceService } from './device.service';
import { FindDevicesRequest } from './requests/find-devices.request';
import { FindDeviceByUuidRequest } from './requests/find-device-by-uuid.request';
import { CreateDeviceRequest } from './requests/create-device.request';
import { UpdateDeviceByUuidRequest } from './requests/update-device-by-uuid.request';
import { UpdateDeviceStatusByUuidRequest } from './requests/update-device-status-by-uuid.request';
import { UpdateDeviceActivityByUuidRequest } from './requests/update-device-activity-by-uuid.request';

export class DeviceController {
  private readonly service: DeviceService;

  public constructor () {
    this.service = new DeviceService();
  }

  public async findDevices (request: Request, response: Response): Promise<Response> {
    try {
      const findDevicesRequest = new FindDevicesRequest(
        request.query.userUuid !== undefined ? String(request.query.userUuid) : undefined,
        request.query.ipAddress !== undefined ? String(request.query.ipAddress) : undefined,
        request.query.platform !== undefined ? String(request.query.platform) : undefined,
        request.query.model !== undefined ? String(request.query.model) : undefined
      );
      const devices = await this.service.findDevices(findDevicesRequest);
      return response.status(200).json(devices);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async findDeviceByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findDeviceByUuidRequest = new FindDeviceByUuidRequest(
        request.params.uuid
      );
      const device = await this.service.findDeviceByUuid(findDeviceByUuidRequest);
      return response.status(200).json(device);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async createDevice (request: Request, response: Response): Promise<Response> {
    try {
      const createDeviceRequest = new CreateDeviceRequest(
        request.body.userUuid,
        request.body.ipAddress,
        request.body.platform,
        request.body.model
      );
      const device = await this.service.createDevice(createDeviceRequest);
      return response.status(201).json(device);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async updateDeviceByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDeviceByUuidRequest = new UpdateDeviceByUuidRequest(
        request.params.uuid,
        request.body.ipAddress,
        request.body.platform,
        request.body.model
      );
      const device = await this.service.updateDeviceByUuid(updateDeviceByUuidRequest);
      return response.status(201).json(device);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async updateDeviceStatusByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDeviceStatusByUuidRequest = new UpdateDeviceStatusByUuidRequest(
        request.params.uuid,
        request.body.enabled
      );
      const device = await this.service.updateDeviceStatusByUuid(updateDeviceStatusByUuidRequest);
      return response.status(201).json(device);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async updateDeviceActivityByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDeviceActivityByUuidRequest = new UpdateDeviceActivityByUuidRequest(
        request.params.uuid,
        request.body.activity
      );
      const device = await this.service.updateDeviceActivityByUuid(updateDeviceActivityByUuidRequest);
      return response.status(201).json(device);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }
}
