import { type Request, type Response } from 'express';
import { type UpdateDeviceByUuidRequest, type CreateDeviceRequest, type FindDeviceByUuidRequest, type FindDevicesByUserUuidRequest } from './structs/device.request';
import { DeviceService } from './device.service';

export class DeviceController {
  private readonly service: DeviceService = new DeviceService();

  private async sendExceptionQueue (routeURL: string, exception: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    const correlationUuid = this.randomProvider.randomUUID()

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({ routeURL, correlationUuid, exception }))
    ).catch(() => { throw new InternalServerException() });
  }

  public async findDevicesByUserUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findDevicesRequest: FindDevicesByUserUuidRequest = {
        userUuid: String(request.query.userUuid)
      }
      const devices = await this.service.findDevicesByUserUuid(findDevicesRequest);
      return response.status(200).json(devices)
    } catch (error: any) {
      await this.sendExceptionQueue('security.devices::findDevicesByUserUuid', error);
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
      await this.sendExceptionQueue('security.devices::findDeviceByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createDevice (request: Request, response: Response): Promise<Response> {
    try {
      const createDeviceRequest: CreateDeviceRequest = {
        userUuid: request.body.userUuid,
        userAgent: request.body.userAgent
      }
      const device = await this.service.createDevice(createDeviceRequest);
      return response.status(201).json(device)
    } catch (error: any) {
      await this.sendExceptionQueue('security.devices::createDevice', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateDeviceByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDeviceByUuidRequest: UpdateDeviceByUuidRequest = {
        uuid: request.params.uuid,
        userAgent: request.body.userAgent,
        visible: request.body.visible,
        active: request.body.active
      }
      const device = await this.service.updateDeviceByUuid(updateDeviceByUuidRequest);
      return response.status(201).json(device)
    } catch (error: any) {
      await this.sendExceptionQueue('security.devices::updateDeviceByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
