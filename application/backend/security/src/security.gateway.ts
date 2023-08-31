import { Router } from 'express';
import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { UserGateway } from './gateways/user/user.gateway';
import { LocationGateway } from './gateways/location/location.gateway';
import { DeviceGateway } from './gateways/device/device.gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor () {
    super(Router());
  }

  public subscribe (): Router {
    this.router.use('/users', new UserGateway().subscribe());
    this.router.use('/locations', new LocationGateway().subscribe());
    this.router.use('/devices', new DeviceGateway().subscribe());
    return this.router;
  }
}
