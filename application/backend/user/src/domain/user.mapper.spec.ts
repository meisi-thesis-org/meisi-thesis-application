import { describe, expect, it } from 'vitest'
import { UserMapper } from './user.mapper'
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { randomUUID } from 'crypto';

describe('UserMapper', () => {
  const userMapper = new UserMapper();

  const dummyUuid = randomUUID();
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyAccessCode = 'dummyAccessCode';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = 'dummyDateBirth';
  const dummyCreatedAt = new Date();
  const dummyUpdatedAt = dummyCreatedAt;

  const instance = new UserEntity(
    dummyUuid,
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber,
    dummyAccessCode,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should transform UserEntity to UserDTO', () => {
    expect(userMapper.apply(instance)).toBeInstanceOf(UserDTO)
  })
})
