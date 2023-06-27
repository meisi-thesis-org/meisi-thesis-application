import { ConflictException } from '../../exceptions/conflict.exception';
import { InternalServerException } from '../../exceptions/internal-server.exception';
import { type EncoderProvider } from '../../providers/encoder.provider';
import { type GeneratorProvider } from '../../providers/generator.provider';
import { SecurityConfiguration } from '../../security.configuration';
import { type UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { type SignUpRequest } from './requests/sign-up.request';
import { UserConfiguration } from './user.configuration';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly userDTOMapper: UserDTOMapper = UserConfiguration.getInstance().getUserDTOMapper();
  private readonly encoderProvider: EncoderProvider = SecurityConfiguration.getInstance().getEncoderProvider();
  private readonly generatorProvider: GeneratorProvider = SecurityConfiguration.getInstance().getGeneratorProvider();

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

    const generatedAccessCode = this.generatorProvider.generateRandomString(12);
    const encodedAccessCode = await this.encoderProvider
      .encode(generatedAccessCode)
      .catch(() => { throw new InternalServerException() });

    const createdUser = new UserEntity(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber(),
      signUpRequest.getFirstName(),
      signUpRequest.getLastName(),
      signUpRequest.getDateBirth(),
      encodedAccessCode
    );

    const savedUser = await this.userRepository
      .save(createdUser)
      .catch(() => {
        throw new InternalServerException()
      })

    // TODO: SendEmail

    return this.userDTOMapper.apply(savedUser);
  }
}
