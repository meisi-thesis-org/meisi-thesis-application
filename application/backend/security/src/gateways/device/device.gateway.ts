import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { DeviceController } from './device.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-shared/src/middlewares/schema-validator.middleware';
import { FindDeviceByUuidSchema } from './schemas/find-device-by-uuid.schema';
import { FindDevicesSchema } from './schemas/find-devices.schema';
import { CreateDeviceSchema } from './schemas/create-device.schema';
import { UpdateDeviceByUuidSchema } from './schemas/update-device-by-uuid.schema';

export class DeviceGateway extends Gateway<Router> {
  private readonly deviceController: DeviceController;

  public constructor () {
    super(Router());

    this.deviceController = new DeviceController();
  }

  public override subscribe (): Router {
    this.router.get('/', SchemaValidator(FindDevicesSchema), async (request: Request, response: Response) => await this.deviceController.findDevices(request, response))
    this.router.get('/:uuid', SchemaValidator(FindDeviceByUuidSchema), async (request: Request, response: Response) => await this.deviceController.findDeviceByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateDeviceSchema), async (request: Request, response: Response) => await this.deviceController.createDevice(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateDeviceByUuidSchema), async (request: Request, response: Response) => await this.deviceController.updateDeviceByUuid(request, response))
    this.router.put('/:uuid/status', async (request: Request, response: Response) => await this.deviceController.updateDeviceStatusByUuid(request, response))
    this.router.put('/:uuid/activity', async (request: Request, response: Response) => await this.deviceController.updateDeviceActivityByUuid(request, response))

    return this.router;
  }
}
