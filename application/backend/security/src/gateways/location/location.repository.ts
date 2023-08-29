import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type LocationEntity } from './domain/location.entity';

export interface LocationRepository extends Repository<string, LocationEntity> {
  findLocationsByQueryParams(
    userUuid: string | undefined,
    coordinateX: string | undefined,
    coordinateY: string | undefined
  ): Promise<LocationEntity[]>
  findLocationByCoordinatesWithUserUuid(userUuid: string, coordinateX: string, coordinateY: string): Promise<LocationEntity | undefined>
  updateCoordinatesByUuid(uuid: string, coordinateX: string, coordinateY: string): Promise<LocationEntity | undefined>
  updateStatusByUuid(uuid: string, enabled: boolean): Promise<LocationEntity | undefined>
  updateActivityByUuid(uuid: string, activated: boolean): Promise<LocationEntity | undefined>
}
