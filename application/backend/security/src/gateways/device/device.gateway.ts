import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { DeviceController } from './device.controller';

export class DeviceGateway extends Gateway<Router> {
  private readonly deviceController: DeviceController;

  public constructor () {
    super(Router());

    this.deviceController = new DeviceController();
  }

  public override subscribe (): Router {
    this.router.get('/', async (request: Request, response: Response) => await this.deviceController.findDevices(request, response))
    this.router.get('/:uuid', async (request: Request, response: Response) => await this.deviceController.findDeviceByUuid(request, response))
    this.router.post('/', async (request: Request, response: Response) => await this.deviceController.createDevice(request, response))
    this.router.put('/:uuid/status', async (request: Request, response: Response) => await this.deviceController.updateStatusByUuid(request, response))
    this.router.put('/:uuid/activity', async (request: Request, response: Response) => await this.deviceController.updateActivityByUuid(request, response))

    return this.router;
  }
}
