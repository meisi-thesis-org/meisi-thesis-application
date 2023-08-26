import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { type LocationEntity } from './location.entity';
import { LocationDTO } from './location.dto';

export class LocationMapper extends Mapper<LocationEntity, LocationDTO> {
  public map (entity: LocationEntity): LocationDTO {
    return new LocationDTO(
      entity.getUuid(),
      entity.getUserUuid(),
      entity.getCoordinateX(),
      entity.getCoordinateY(),
      entity.getEnabled(),
      entity.getDeactivated(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
