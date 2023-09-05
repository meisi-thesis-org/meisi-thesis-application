import { type LocationEntity, type LocationDTO } from './structs/location.domain';

export interface LocationRepository {
  findLocationsByUserUuid(userUuid: string | undefined): Promise<LocationDTO[]>
  findLocationByUuid(uuid: string): Promise<LocationDTO | undefined>
  findLocationByProps(
    userUuid: string,
    coordinateX: string,
    coordinateY: string
  ): Promise<LocationDTO | undefined>
  createLocation(locationEntity: LocationEntity): Promise<void>
  updateLocationByUuid(uuid: string, locationEntity: Omit<LocationEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<LocationEntity | undefined>
}
