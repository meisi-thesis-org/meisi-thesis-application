import { type Request, type Response } from 'express';
import { type UpdateDeviceByUuidRequest, type CreateDeviceRequest, type FindDeviceByUuidRequest, type FindDevicesByUserUuidRequest } from './structs/device.request';
import { DeviceService } from './device.service';

export class DeviceController {
  private readonly service: DeviceService = new DeviceService();

  public async findDevicesByUserUuidRequest (request: Request, response: Response): Promise<Response> {
    try {
      const findDevicesRequest: FindDevicesByUserUuidRequest = {
        userUuid: String(request.query.userUuid)
      }
      const devices = await this.service.findDevicesByUserUuidRequest(findDevicesRequest);
      return response.status(200).json(devices)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findDeviceByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findDeviceByUuidRequest: FindDeviceByUuidRequest = {
        uuid: request.params.uuid
      }
      const device = await this.service.findDeviceByUuid(findDeviceByUuidRequest);
      return response.status(200).json(device)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createDevice (request: Request, response: Response): Promise<Response> {
    try {
      const createDeviceRequest: CreateDeviceRequest = {
        userUuid: request.body.userUuid,
        ipAddress: request.body.ipAddress,
        platform: request.body.platform,
        model: request.body.model
      }
      const device = await this.service.createDevice(createDeviceRequest);
      return response.status(201).json(device)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateDeviceByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDeviceByUuidRequest: UpdateDeviceByUuidRequest = {
        uuid: request.params.uuid,
        ipAddress: request.body.ipAddress,
        platform: request.body.platform,
        model: request.body.model,
        visible: request.body.visible,
        active: request.body.active
      }
      const device = await this.service.updateDeviceByUuid(updateDeviceByUuidRequest);
      return response.status(201).json(device)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}
