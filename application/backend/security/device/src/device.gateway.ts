import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { DeviceController } from './device.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateDeviceSchema, FindDeviceByUuidSchema, FindDevicesByUserUuidSchema, UpdateDeviceByUuidSchema } from './structs/device.schema';

export class DeviceGateway extends Gateway<Router> {
  private readonly controller: DeviceController = new DeviceController();
  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindDeviceByUuidSchema), async (request: Request, response: Response) => await this.controller.findDeviceByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateDeviceByUuidSchema), async (request: Request, response: Response) => await this.controller.updateDeviceByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateDeviceSchema), async (request: Request, response: Response) => await this.controller.createDevice(request, response))
    this.router.get('/', SchemaValidator(FindDevicesByUserUuidSchema), async (request: Request, response: Response) => await this.controller.findDevicesByUserUuidRequest(request, response))

    return this.router;
  }
}
