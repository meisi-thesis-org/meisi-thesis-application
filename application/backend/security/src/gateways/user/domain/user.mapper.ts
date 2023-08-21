import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { type UserEntity } from './user.entity';
import { UserDTO } from './user.domain';

export class UserMapper extends Mapper<UserEntity, UserDTO> {
  public map (entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.getUuid(),
      entity.getEmail(),
      entity.getUsername(),
      entity.getFirstName(),
      entity.getLastName(),
      entity.getDateBirth(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
