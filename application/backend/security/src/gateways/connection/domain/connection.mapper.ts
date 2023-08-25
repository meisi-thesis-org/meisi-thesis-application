import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { type ConnectionEntity } from './connection.entity';
import { ConnectionDTO } from './connection.dto';

export class ConnectionMapper extends Mapper<ConnectionEntity, ConnectionDTO> {
  public map (entity: ConnectionEntity): ConnectionDTO {
    return new ConnectionDTO(
      entity.getUuid(),
      entity.getUserUuid(),
      entity.getDeviceUuid(),
      entity.getOwnershipUuid(),
      entity.getLocationUuid(),
      entity.getAccessToken(),
      entity.getRefreshToken(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    )
  }
}
