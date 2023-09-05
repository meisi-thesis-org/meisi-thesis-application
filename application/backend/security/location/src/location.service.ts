import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { locationMapper, type LocationDTO, type LocationEntity } from './structs/location.domain';
import { type UpdateLocationByUuidRequest, type CreateLocationRequest, type FindLocationByUuidRequest, type FindLocationsByUserUuidRequest } from './structs/location.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type LocationRepository } from './location.repository';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { LocationStateRepository } from './repositories/location-state.repository';

export class LocationService {
  private readonly repository: LocationRepository = new LocationStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findLocationsByUserUuid (
    findLocationsByUserUuidRequest: FindLocationsByUserUuidRequest
  ): Promise<LocationDTO[]> {
    const foundLocations = await this.repository
      .findLocationsByUserUuid(findLocationsByUserUuidRequest.userUuid)
      .catch(() => { throw new InternalServerException(); })

    const mappedLocations = new Array<LocationDTO>();

    for (const foundLocation of foundLocations) {
      mappedLocations.push(locationMapper(foundLocation));
    }

    return mappedLocations
  }

  public async findLocationByUuid (
    findLocationByUuidRequest: FindLocationByUuidRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findLocationByUuid(findLocationByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundLocation === undefined) throw new NonFoundException();

    return locationMapper(foundLocation);
  }

  public async createLocation (
    createLocationRequest: CreateLocationRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findLocationByProps(
        createLocationRequest.userUuid,
        createLocationRequest.coordinateX,
        createLocationRequest.coordinateY
      ).catch(() => { throw new InternalServerException(); })

    if (foundLocation !== undefined) throw new ConflictException();

    await this.networkProvider.doHttpRequest(
      '8001',
      'security/users',
      'GET',
      undefined,
      { userUuid: createLocationRequest.userUuid }
    )

    const createdLocation: LocationEntity = {
      uuid: this.randomProvider.randomUUID(),
      userUuid: createLocationRequest.userUuid,
      coordinateX: createLocationRequest.coordinateX,
      coordinateY: createLocationRequest.coordinateY,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toString()
    }

    await this.repository
      .createLocation(createdLocation)
      .catch(() => { throw new InternalServerException(); })

    return locationMapper(createdLocation);
  }

  public async updateLocationByUuid (
    updateLocationByUuidRequest: UpdateLocationByUuidRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findLocationByUuid(updateLocationByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundLocation === undefined) throw new NonFoundException();

    const toUpdateLocation: Omit<LocationEntity, 'uuid' | 'userUuid' | 'createdAt'> = {
      coordinateX: updateLocationByUuidRequest.coordinateX ?? foundLocation.coordinateX,
      coordinateY: updateLocationByUuidRequest.coordinateY ?? foundLocation.coordinateY,
      visible: updateLocationByUuidRequest.visible ?? foundLocation.visible,
      active: updateLocationByUuidRequest.active ?? foundLocation.active,
      updatedAt: new Date().toISOString()
    }

    const updatedLocation = await this.repository
      .updateLocationByUuid(foundLocation.uuid, toUpdateLocation)
      .catch(() => { throw new InternalServerException(); })

    if (updatedLocation === undefined) throw new NonFoundException();

    return locationMapper(updatedLocation);
  }
}
