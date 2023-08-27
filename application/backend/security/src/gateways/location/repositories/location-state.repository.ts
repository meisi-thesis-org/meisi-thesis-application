import { type LocationEntity } from '../domain/location.entity';
import { type LocationRepository } from '../location.repository';

export class LocationStateRepository implements LocationRepository {
  private readonly locationCollection: LocationEntity[] = new Array<LocationEntity>();

  public async findBulk (): Promise<LocationEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async findOneByUuid (uuid: string): Promise<LocationEntity | undefined> {
    return this.locationCollection.find((location) => location.getUuid() === uuid);
  }

  public async createOne (entity: LocationEntity): Promise<void> {
    this.locationCollection.push(entity);
  }

  public async findLocationByCoordinates (
    coordinateX: string,
    coordinateY: string
  ): Promise<LocationEntity | undefined> {
    return this.locationCollection.find((location) =>
      (location.getCoordinateX() === coordinateX &&
      location.getCoordinateY() === coordinateY)
    )
  }

  public async updateCoordinatesByUuid (
    uuid: string,
    coordinateX: string,
    coordinateY: string
  ): Promise<LocationEntity | undefined> {
    return this.locationCollection.find((location) => {
      if (location.getUuid() === uuid) {
        location.setCoordinateX(coordinateX);
        location.setCoordinateY(coordinateY);
        location.setUpdatedAt(new Date().toISOString())
      }

      return location;
    })
  }
}
