import { describe, expect, it } from 'vitest';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

describe('UserMapper', () => {
  const instance = new UserMapper();

  it('should have an instanceOf UserMapper', () => {
    expect(instance).instanceOf(UserMapper);
  })

  describe('map', () => {
    it('should have an UserDTO from an UserEntity', () => {
      const dummyUuid = new RandomProvider().randomUUID();
      const dummyEmail = 'dummyEmail';
      const dummyUsername = 'dummyUsername';
      const dummyPhoneNumber = 'dummyPhoneNumber';
      const dummyAccessToken = 'dummyAccessToken';
      const dummyFirstName = 'dummyFirstName';
      const dummyLastName = 'dummyLastName';
      const dummyDateBirth = new Date().toISOString();
      const dummyCreatedAt = new Date().toISOString();
      const dummyUpdatedAt = new Date().toISOString();

      const userEntity = new UserEntity(
        dummyUuid,
        dummyEmail,
        dummyUsername,
        dummyPhoneNumber,
        dummyAccessToken,
        dummyFirstName,
        dummyLastName,
        dummyDateBirth,
        dummyCreatedAt,
        dummyUpdatedAt
      );

      expect(instance.map(userEntity)).toBeInstanceOf(UserDTO)
    })
  })
})
