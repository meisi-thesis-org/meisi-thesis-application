import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { type DeviceEntity } from './device.entity';
import { DeviceDTO } from './device.dto';

export class DeviceMapper extends Mapper<DeviceEntity, DeviceDTO> {
  public map (entity: DeviceEntity): DeviceDTO {
    return new DeviceDTO(
      entity.getUuid(),
      entity.getUserUuid(),
      entity.getIpAddress(),
      entity.getPlatform(),
      entity.getModel(),
      entity.getEnabled(),
      entity.getActivated(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
