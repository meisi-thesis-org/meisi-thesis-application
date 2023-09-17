import { describe, expect, it, vi } from 'vitest';
import { UserService } from './user.service';
import { UserStateRepository } from './repositories/user-state.repository';
import { type UserEntity, type UserDTO } from './structs/user.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { HashProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/hash.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('UserService', () => {
  const instance = new UserService();

  it('should have an instanceOf UserService', () => {
    expect(instance).toBeInstanceOf(UserService)
  })

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const userEntity: UserEntity = {
    uuid: randomUuid,
    username: randomString,
    email: randomString,
    phoneNumber: randomString,
    accessCode: randomString,
    name: randomString,
    dateBirth: randomString,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  const userDTO: UserDTO = {
    uuid: randomUuid,
    username: randomString,
    email: randomString,
    phoneNumber: randomString,
    name: randomString,
    dateBirth: randomString,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findUserByUuid', () => {
    async function callFindUserByUuid (): Promise<UserDTO> {
      return await instance.findUserByUuid({
        uuid: randomUuid
      });
    }

    it('should have an UserDTO returned', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockResolvedValue(userEntity);

      await expect(callFindUserByUuid()).resolves.toEqual(userDTO);
    })

    it('should have an InternalServerException thrown', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindUserByUuid()).rejects.toThrowError(InternalServerException);
    })

    it('should have an NonFoundException thrown', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindUserByUuid()).rejects.toThrowError(NonFoundException);
    })
  })

  describe('createUser', () => {
    async function callCreateUser (): Promise<UserDTO> {
      return await instance.createUser({
        username: randomString,
        email: randomString,
        phoneNumber: randomString,
        name: randomString,
        dateBirth: randomDateBirth
      });
    }

    it('should have an UserDTO returned', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(undefined)
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHash')
      vi.spyOn(UserStateRepository.prototype, 'createUser').mockResolvedValue()

      await expect(callCreateUser()).resolves.toBeDefined()
    })

    it('should have an InternalServerException thrown because UserRepository.findUserByAuthCredentials threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockRejectedValue(new InternalServerException())

      await expect(async () => await callCreateUser()).rejects.toThrowError(InternalServerException)
    })

    it('should have an InternalServerException thrown because HashProvider.hash threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(undefined)
      vi.spyOn(HashProvider.prototype, 'hash').mockRejectedValue(new InternalServerException())

      await expect(async () => await callCreateUser()).rejects.toThrowError(InternalServerException)
    })

    it('should have an InternalServerException thrown because UserRepository.createUser threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(undefined)
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHash')
      vi.spyOn(UserStateRepository.prototype, 'createUser').mockRejectedValue(new InternalServerException())

      await expect(async () => await callCreateUser()).rejects.toThrowError(InternalServerException)
    })
    it('should have an ConflictException thrown because UserRepository.findUserByAuthCredentials returned other than undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(userEntity)
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHash')
      vi.spyOn(UserStateRepository.prototype, 'createUser').mockResolvedValue()

      await expect(async () => await callCreateUser()).rejects.toThrowError(ConflictException)
    })
  })

  describe('updateUserByUuid', () => {
    async function callUpdateUserByUuid (): Promise<UserDTO> {
      return await instance.updateUserByUuid({
        uuid: randomUuid,
        username: randomString,
        email: randomString,
        phoneNumber: randomString,
        name: randomString,
        dateBirth: randomString
      })
    }

    it('should have a defined response', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockResolvedValue(userEntity);
      vi.spyOn(UserStateRepository.prototype, 'updateUser').mockResolvedValue();

      await expect(callUpdateUserByUuid()).resolves.toBeDefined();
    })

    it('should have an InternalServerException thrown because UserRepository.findUserByUuid threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockRejectedValue(new InternalServerException());

      await expect(async () => await callUpdateUserByUuid()).rejects.toThrowError(InternalServerException);
    })

    it('should have an NonFoundException thrown because UserRepository.findUserByUuid returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateUserByUuid()).rejects.toThrowError(NonFoundException);
    })

    it('should have a NonFoundException because UserRepository.findUserByUuid threw a NonFoundException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByUuid').mockResolvedValue(userEntity);
      vi.spyOn(UserStateRepository.prototype, 'updateUser').mockRejectedValue(InternalServerException);

      await expect(async () => await callUpdateUserByUuid()).rejects.toThrowError(InternalServerException);
    })
  })

  describe('updateUserAccessCode', () => {
    async function callUpdateUserAccessCode (): Promise<UserDTO> {
      return await instance.updateUserAccessCode({
        username: 'dummyUsername',
        email: 'dummyEmail',
        phoneNumber: 'dummyPhoneNumber'
      })
    }

    it('should have a defined response', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(userEntity)
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHash')
      vi.spyOn(UserStateRepository.prototype, 'updateUser').mockResolvedValue()

      await expect(callUpdateUserAccessCode()).resolves.toBeDefined()
    })

    it('should have an InternalServerException thrown because UserRepository.findUserByAuthCredentials threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockRejectedValue(new InternalServerException())

      await expect(async () => await callUpdateUserAccessCode()).rejects.toThrowError(InternalServerException)
    })

    it('should have an InternalServerException thrown because UserRepository.findUserByAuthCredentials returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(undefined)

      await expect(async () => await callUpdateUserAccessCode()).rejects.toThrowError(NonFoundException)
    })

    it('should have an InternalServerException thrown because HashProvider.hash threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(userEntity)
      vi.spyOn(HashProvider.prototype, 'hash').mockRejectedValue(new InternalServerException())

      await expect(async () => await callUpdateUserAccessCode()).rejects.toThrowError(InternalServerException)
    })

    it('should have an InternalServerException thrown because UserRepository.updateUser threw an InternalServerException', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByAuthCredentials').mockResolvedValue(userEntity)
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHash')
      vi.spyOn(UserStateRepository.prototype, 'updateUser').mockRejectedValue(new InternalServerException())

      await expect(async () => await callUpdateUserAccessCode()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('findUserByAccessCode', () => {
    async function callFindUserByAccessCode (): Promise<UserDTO> {
      return await instance.findUserByAccessCode({
        accessCode: randomString
      });
    }

    it('should have an UserDTO returned', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockResolvedValue(true);

      await expect(callFindUserByAccessCode()).resolves.toEqual(userDTO);
    })

    it('should have an InternalServerException thrown', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockRejectedValue(new Error());

      await expect(async () => await callFindUserByAccessCode()).rejects.toThrowError(InternalServerException);
    })

    it('should have an NonFoundException thrown', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([]);

      await expect(async () => await callFindUserByAccessCode()).rejects.toThrowError(NonFoundException);
    })
  })
})
