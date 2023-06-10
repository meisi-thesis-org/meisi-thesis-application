import { UserDTOMapper } from '../../../../../src/gateways/user/domain/user-dto.mapper'
import { UserDTO } from '../../../../../src/gateways/user/domain/user.dto';
import { UserEntity } from '../../../../../src/gateways/user/domain/user.entity';
import crypto from 'crypto';

describe('UserDTOMapper', () => {
  const userDTOMapper: UserDTOMapper = new UserDTOMapper();

  const uuid = crypto.randomUUID();
  const username = 'dummyUsername';
  const email = 'dummyEmail';
  const phoneNumber = 'dummyPhoneNumber';
  const firstName = 'dummyFirstName';
  const lastName = 'dummyLastName';
  const dateBirth = new Date();
  const accessCode = 'dummyAccessCode';
  const accessToken = 'dummyAccessToken';
  const refreshToken = 'dummyRefreshCode';
  const blocked = false;
  const deactivated = false;
  const acceptedPrivacyTerms = false;

  const userEntity: UserEntity = new UserEntity(
    uuid,
    username,
    email,
    phoneNumber,
    firstName,
    lastName,
    dateBirth,
    accessCode,
    accessToken,
    refreshToken,
    blocked,
    deactivated,
    acceptedPrivacyTerms
  );

  it(('should convert UserEntity to UserDTO'), () => {
    expect(userDTOMapper.apply(userEntity)).toBeInstanceOf(UserDTO)
  })
})
