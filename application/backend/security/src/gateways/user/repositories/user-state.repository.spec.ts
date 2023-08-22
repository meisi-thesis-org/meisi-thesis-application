import { describe, it, expect } from 'vitest';
import { UserStateRepository } from './user-state.repository';
import { UserEntity } from '../domain/user.entity';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

describe('UserStateRepository', () => {
  const instance = new UserStateRepository();

  it('should have an instanceOf UserStateRepository', () => {
    expect(instance).toBeInstanceOf(UserStateRepository);
  })

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

  it('should have an user created', async () => {
    await expect(instance.createOne(userEntity)).resolves.not.toThrow()
  })

  describe('findOneByUuid', () => {
    async function callFindOneByUuid (uuid: string): Promise<UserEntity | undefined> {
      return await instance.findOneByUuid(uuid)
    }

    it('should return an user with a given uuid', async () => {
      await expect(callFindOneByUuid(dummyUuid)).resolves.toEqual(userEntity);
    })

    it('should return undefined because a given user uuid was not found', async () => {
      await expect(callFindOneByUuid('')).resolves.toBe(undefined);
    })
  })

  describe('findUserByCredentials', () => {
    async function callFindUserByCredentials (
      username: string,
      email: string,
      phoneNumber: string
    ): Promise<UserEntity | undefined> {
      return await instance.findUserByCredentials(username, email, phoneNumber)
    }

    it('should return an user with a given credential', async () => {
      await expect(
        callFindUserByCredentials(
          userEntity.getUsername(),
          userEntity.getEmail(),
          userEntity.getPhoneNumber()
        )
      ).resolves.toEqual(userEntity);
    })

    it('should return undefined because a given user credentials was not found', async () => {
      await expect(callFindUserByCredentials('', '', '')).resolves.toBe(undefined);
    })
  })
})
