import { Mapper } from '../../../shared/abstracts/mapper';
import { UserDTO } from './user.dto';
import { type UserEntity } from './user.entity';

export class UserDTOMapper extends Mapper<UserEntity, UserDTO> {
  public override apply(entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.getUuid(),
      entity.getUsername(),
      entity.getEmail(),
      entity.getPhoneNumber(),
      entity.getFirstName(),
      entity.getLastName(),
      entity.getDateBirth(),
      entity.getAccessToken(),
      entity.getRefreshToken(),
      entity.getBlocked(),
      entity.getDeactivated(),
      entity.getAcceptedPrivacyTerms(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }
}
