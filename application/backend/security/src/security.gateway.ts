import { Router } from 'express';
import { Gateway } from './../../shared/abstracts/gateway.abstract'
import { SecurityGatewayCollection } from './shared/collections/security-gateway.collection'
import { UserGateway } from './gateways/user/user.gateway';
import { DeviceGateway } from './gateways/device/device.gateway';
import { LocationGateway } from './gateways/location/location.gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this.router.use(SecurityGatewayCollection.USERS, new UserGateway().subscribe());
    this.router.use(SecurityGatewayCollection.DEVICES, new DeviceGateway().subscribe());
    this.router.use(SecurityGatewayCollection.LOCATIONS, new LocationGateway().subscribe());

    return this.router;
  }
}
