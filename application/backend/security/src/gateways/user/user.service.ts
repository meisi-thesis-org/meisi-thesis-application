import { ConflictException } from '../../exceptions/conflict.exception';
import { InternalServerException } from '../../exceptions/internal-server.exception';
import { UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly userDTOMapper: UserDTOMapper = new UserDTOMapper();

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository.findOneByAuthCredentials(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber()
    ).catch(() => {
      throw new InternalServerException()
    })

    if (foundUser !== null && foundUser !== undefined) {
      throw new ConflictException();
    }
  }
}
