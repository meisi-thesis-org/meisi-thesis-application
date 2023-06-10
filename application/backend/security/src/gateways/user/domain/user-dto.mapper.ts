import { Mapper } from './../../../../../shared/src/abstracts/mapper.abstract';
import { UserDTO } from './user.dto';
import { type UserEntity } from './user.entity';

export class UserDTOMapper extends Mapper<UserEntity, UserDTO> {
  public override apply(entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.uuid,
      entity.username,
      entity.email,
      entity.phoneNumber,
      entity.firstName,
      entity.lastName,
      entity.dateBirth,
      entity.accessToken,
      entity.refreshToken,
      entity.blocked,
      entity.deactivated,
      entity.acceptedPrivacyTerms,
      entity.createdAt,
      entity.updatedAt
    );
  }
}
