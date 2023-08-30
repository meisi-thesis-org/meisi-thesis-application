import { type DeviceRepository } from '../device.repository';
import { type DeviceEntity } from '../domain/device.entity';

export class DeviceStateRepository implements DeviceRepository {
  public async findBulk (): Promise<DeviceEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async findOneByUuid (uuid: string): Promise<DeviceEntity | undefined> {
    throw new Error('Method not implemented.');
  }

  public async createOne (entity: DeviceEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
