import { Mapper } from '@meisi-thesis/application-backend-shared/src/abstracts/mapper.abstract';
import { type UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

export class UserMapper extends Mapper<UserEntity, UserDTO> {
  public map (entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.getUuid(),
      entity.getEmail(),
      entity.getUsername(),
      entity.getPhoneNumber(),
      entity.getFirstName(),
      entity.getLastName(),
      entity.getDateBirth(),
      entity.getAccessToken(),
      entity.getRefreshToken(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
