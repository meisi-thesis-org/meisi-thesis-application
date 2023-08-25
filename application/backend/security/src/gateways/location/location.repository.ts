import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type LocationEntity } from './domain/location.entity';

export interface LocationRepository extends Repository<string, LocationEntity> {}
