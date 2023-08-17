import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { UserDTO } from './user.dto';
import { type UserEntity } from './user.entity';

export class UserMapper extends Mapper<UserEntity, UserDTO> {
  public apply (entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.getUuid(),
      entity.getUsername(),
      entity.getEmail(),
      entity.getPhoneNumber(),
      entity.getFirstName(),
      entity.getLastName(),
      entity.getDateBirth(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
