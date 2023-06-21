import { HttpCodeCollection } from '../../../../shared/src/collections/http-code.collection';
import { type GeneratorService } from '../../../../shared/src/services/generator.service';
import { SecurityConfiguration } from '../../security.configuration';
import { UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { UserLocalRepository } from './repositories/user-local.repository';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly repository: UserRepository = new UserLocalRepository();
  private readonly userDTOMapper: UserDTOMapper = new UserDTOMapper();
  private readonly generatorService: GeneratorService = SecurityConfiguration.instance.generatorService;

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const userEntity = new UserEntity(
      this.generatorService.generateUuid(),
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber(),
      signUpRequest.getFirstName(),
      signUpRequest.getLastName(),
      signUpRequest.getDateBirth(),
      this.generatorService.generateRandomString(12)
    );

    const createdUser = await this.repository.save(userEntity).catch((error) => {
      throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
    });

    if (createdUser === undefined) {
      throw { status: HttpCodeCollection.NOT_FOUND }
    }

    return this.userDTOMapper.apply(createdUser)
  }
}
