import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type DeviceEntity } from './domain/device.entity';

export interface DeviceRepository extends Repository<string, DeviceEntity> {}
