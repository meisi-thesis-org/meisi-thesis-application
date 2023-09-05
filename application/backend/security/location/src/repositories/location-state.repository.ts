import { type LocationRepository } from '../location.repository';
import { type LocationDTO, type LocationEntity } from '../structs/location.domain';

export class LocationStateRepository implements LocationRepository {
  private readonly locationCollection: LocationEntity[] = new Array<LocationEntity>();

  public async findLocationsByUserUuid (
    userUuid: string | undefined
  ): Promise<LocationDTO[]> {
    return this.locationCollection.filter((location) => location.userUuid === userUuid);
  }

  public async findLocationByUuid (
    uuid: string
  ): Promise<LocationDTO | undefined> {
    return this.locationCollection.find((location) => location.uuid === uuid);
  }

  public async findLocationByProps (
    userUuid: string,
    coordinateX: string,
    coordinateY: string
  ): Promise<LocationDTO | undefined> {
    return this.locationCollection.find((location) => {
      if (
        location.userUuid === userUuid &&
        location.coordinateX === coordinateX &&
        location.coordinateY === coordinateY
      ) return location

      return undefined
    });
  }

  public async createLocation (
    locationEntity: LocationEntity
  ): Promise<void> {
    this.locationCollection.push(locationEntity)
  }

  public async updateLocationByUuid (
    uuid: string,
    locationEntity: Omit<LocationEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<LocationEntity | undefined> {
    return this.locationCollection.find((location) => {
      if (location.uuid === uuid) location = { ...location, ...locationEntity }
      return location
    })
  }
}
