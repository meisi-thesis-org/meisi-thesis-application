import { UserDTOMapper } from './domain/user-dto.mapper';

export class UserConfiguration {
  private static instance: UserConfiguration | null = null;

  /** Instances */
  private readonly userDTOMapper: UserDTOMapper;

  private constructor() {
    this.userDTOMapper = new UserDTOMapper();
  }

  public static getInstance(): UserConfiguration {
    if (this.instance === null) {
      this.instance = new UserConfiguration();
    }

    return this.instance;
  }

  public getUserDTOMapper(): UserDTOMapper {
    return this.userDTOMapper;
  }
}
