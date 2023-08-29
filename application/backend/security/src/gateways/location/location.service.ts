import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { type LocationDTO } from './domain/location.dto';
import { type LocationRepository } from './location.repository';
import { LocationStateRepository } from './repositories/location-state.repository';
import { type CreateLocationRequest } from './requests/create-location.request';
import { type FindLocationByUuidRequest } from './requests/find-location-by-uuid.request';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { LocationMapper } from './domain/location.mapper';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-shared/src/exceptions/conflict.exception';
import { LocationEntity } from './domain/location.entity';
import { type UpdateCoordinatesByUuidRequest } from './requests/update-coordinates-by-uuid.request';
import { type UpdateStatusByUuidRequest } from './requests/update-status-by-uuid.request';
import { type UpdateActivityByUuidRequest } from './requests/update-activity-by-uuid.request';
import { type FindLocationsRequest } from './requests/find-locations.request';

export class LocationService {
  private readonly repository: LocationRepository;
  private readonly randomProvider: RandomProvider;
  private readonly mapper: LocationMapper;

  public constructor () {
    this.repository = new LocationStateRepository();
    this.randomProvider = new RandomProvider();
    this.mapper = new LocationMapper();
  }

  public async findLocations (
    findLocationsRequest: FindLocationsRequest
  ): Promise<LocationDTO[]> {
    const locations = await this.repository
      .findBulk()
      .catch(() => {
        throw new InternalServerException();
      })

    if (locations.length === 0) throw new NonFoundException();

    const mappedLocations: LocationDTO[] = [];

    for (const location of locations) {
      mappedLocations.push(this.mapper.map(location));
    }

    return mappedLocations;
  }

  public async findLocationByUuid (
    findLocationByUuidRequest: FindLocationByUuidRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findOneByUuid(findLocationByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundLocation === undefined) throw new NonFoundException();

    return this.mapper.map(foundLocation);
  }

  public async createLocation (
    createLocationRequest: CreateLocationRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findLocationByCoordinatesWithUserUuid(
        createLocationRequest.getUserUuid(),
        createLocationRequest.getCoordinateX(),
        createLocationRequest.getCoordinateY()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (foundLocation !== undefined) throw new ConflictException();

    const createdLocation = new LocationEntity(
      this.randomProvider.randomUUID(),
      createLocationRequest.getUserUuid(),
      createLocationRequest.getCoordinateX(),
      createLocationRequest.getCoordinateY(),
      true,
      true,
      new Date().toISOString(),
      new Date().toISOString()
    )

    await this.repository.createOne(createdLocation).catch(() => {
      throw new InternalServerException();
    })

    return this.mapper.map(createdLocation);
  }

  public async updateCoordinatesByUuid (
    updateCoordinatesByUuidRequest: UpdateCoordinatesByUuidRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findOneByUuid(updateCoordinatesByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundLocation === undefined) throw new NonFoundException();

    const updatedLocation = await this.repository
      .updateCoordinatesByUuid(
        updateCoordinatesByUuidRequest.getUuid(),
        updateCoordinatesByUuidRequest.getCoordinatesX(),
        updateCoordinatesByUuidRequest.getCoordinatesY()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (updatedLocation === undefined) throw new NonFoundException();

    return this.mapper.map(updatedLocation);
  }

  public async updateStatusByUuid (
    updateStatusByUuidRequest: UpdateStatusByUuidRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findOneByUuid(updateStatusByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundLocation === undefined) throw new NonFoundException();

    const updatedLocation = await this.repository
      .updateStatusByUuid(
        updateStatusByUuidRequest.getUuid(),
        updateStatusByUuidRequest.getEnabled()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (updatedLocation === undefined) throw new NonFoundException();

    return this.mapper.map(updatedLocation);
  }

  public async updateActivityByUuid (
    updateActivityByUuidRequest: UpdateActivityByUuidRequest
  ): Promise<LocationDTO> {
    const foundLocation = await this.repository
      .findOneByUuid(updateActivityByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundLocation === undefined) throw new NonFoundException();

    const updatedLocation = await this.repository
      .updateActivityByUuid(
        updateActivityByUuidRequest.getUuid(),
        updateActivityByUuidRequest.getActivated()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (updatedLocation === undefined) throw new NonFoundException();

    return this.mapper.map(updatedLocation);
  }
}
