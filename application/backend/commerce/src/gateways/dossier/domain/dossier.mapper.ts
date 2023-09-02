import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { type DossierEntity } from './dossier.entity';
import { DossierDTO } from './dossier.dto';

export class DossierMapper extends Mapper<DossierEntity, DossierDTO> {
  public map (entity: DossierEntity): DossierDTO {
    return new DossierDTO(
      entity.getUuid(),
      entity.getUserUuid(),
      entity.getDescription(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
