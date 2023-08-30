import { type Request, type Response } from 'express';
import { DeviceService } from './device.service';

export class DeviceController {
  private readonly service: DeviceService;

  public constructor () {
    this.service = new DeviceService();
  }

  public async findDevices (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async findDeviceByUuid (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async createDevice (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async updateStatusByUuid (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async updateActivityByUuid (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }
}
