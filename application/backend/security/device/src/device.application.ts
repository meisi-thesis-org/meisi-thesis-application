import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { DeviceGateway } from './device.gateway';

export class DeviceApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8002')
  }

  public defineMiddlewares (): DeviceApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): DeviceApplication {
    this.application.use('/security/devices', new DeviceGateway().subscribe())
    return this;
  }

  public defineListner (): DeviceApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new DeviceApplication().defineMiddlewares().defineRoutes().defineListner();
