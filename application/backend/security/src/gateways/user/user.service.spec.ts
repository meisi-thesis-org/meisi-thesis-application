import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserService } from './user.service';
import { FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { randomUUID } from 'crypto';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { UserStateRepository } from './repositories/user-state.repository';
import { UserEntity } from './domain/user.entity';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UserDTO } from './domain/user.domain';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';

describe('UserService', () => {
  const instance = new UserService();

  it('should have an instanceOf UserService', () => {
    expect(instance).instanceOf(UserService);
  })

  describe('findUserByUuid', () => {
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

    beforeEach(() => {
      vi.mock('user.state.repository', () => ({
        findOneByUuid: vi.fn()
      }))
    })

    const findUserByUuidRequest = new FindUserByUuidRequest(randomUUID());

    it('should return an UserDTO', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);

      await expect(instance.findUserByUuid(findUserByUuidRequest)).resolves.toBeInstanceOf(UserDTO);
    })

    it('should have an exception to be thrown because an user was not found', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await instance.findUserByUuid(findUserByUuidRequest)).rejects.toThrow(NonFoundException);
    })

    it('should have an exception to be thrown because a repository request failed', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await instance.findUserByUuid(findUserByUuidRequest)).rejects.toThrow(InternalServerException);
    })
  })

  describe('signUp', () => {
    beforeEach(() => {
      vi.mock('user.state.repository', () => ({
        findUserByCredentials: vi.fn(),
        createOne: vi.fn()
      }))
    })

    it('should return an UserDTO', () => {})
    it('should have an ConflictException thrown because there is already an user created with provided request body', () => {})
    it('should have an InternalServerException thrown because an error ocurred while calling HashProvider hash ', () => {})
    it('should have an InternalServerException thrown because an error ocurred while calling repository findUserByCredentials', () => {})
    it('should have an InternalServerException thrown because an error ocurred while calling repository create', () => {})
  })
})
