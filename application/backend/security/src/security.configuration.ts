import { ExceptionHandler } from '../../shared/src/handlers/exception.handler';
import { RandomStringProvider } from '../../shared/src/providers/random-string.provider';
import { UuidProvider } from '../../shared/src/providers/uuid.provider';
import { UserDTOMapper } from './gateways/user/domain/user-dto.mapper';

export class SecurityConfiguration {
  private static _instance: SecurityConfiguration | null;

  public static get instance(): SecurityConfiguration {
    if (this._instance === null) {
      this._instance = new SecurityConfiguration();
    }

    return this._instance
  }

  public get exceptionHandler(): ExceptionHandler {
    return ExceptionHandler.instance;
  }

  public get userDTOMapper(): UserDTOMapper {
    return UserDTOMapper.instance;
  }

  public get uuidProvider(): UuidProvider {
    return UuidProvider.instance;
  }

  public get randomStringProvider(): RandomStringProvider {
    return RandomStringProvider.instance;
  }
}
