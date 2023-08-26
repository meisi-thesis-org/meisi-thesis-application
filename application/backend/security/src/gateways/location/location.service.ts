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

export class LocationService {
  private readonly repository: LocationRepository;
  private readonly randomProvider: RandomProvider;
  private readonly mapper: LocationMapper;

  public constructor () {
    this.repository = new LocationStateRepository();
    this.randomProvider = new RandomProvider();
    this.mapper = new LocationMapper();
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
      .findLocationByCoordinates(
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
      false,
      new Date().toISOString(),
      new Date().toISOString()
    )

    await this.repository.createOne(createdLocation).catch(() => {
      throw new InternalServerException();
    })

    return this.mapper.map(createdLocation);
  }
}
