import { describe, expect, it, vi } from 'vitest';
import { UserService } from './user.service';
import { FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { randomUUID } from 'crypto';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { UserStateRepository } from './repositories/user-state.repository';
import { UserEntity } from './domain/user.entity';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UserDTO } from './domain/user.dto';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { SignUpRequest } from './requests/sign-up.request';
import { ConflictException } from '@meisi-thesis/application-backend-shared/src/exceptions/conflict.exception';
import { HashProvider } from '@meisi-thesis/application-backend-shared/src/providers/hash.provider';
import { SignInRequest } from './requests/sign-in.request';
import { TokenProvider } from './providers/token.provider';
import { RefreshAccessCodeRequest } from './requests/refresh-access-code.request';
import { SignOutRequest } from './requests/sign-out.request';
import { RefreshTokensRequest } from './requests/refresh-tokens.request';

describe('UserService', () => {
  const instance = new UserService();

  it('should have an instanceOf UserService', () => {
    expect(instance).instanceOf(UserService);
  })

  const dummyUuid = new RandomProvider().randomUUID();
  const dummyEmail = 'dummyEmail';
  const dummyUsername = 'dummyUsername';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyAccessCode = 'dummyAccessCode';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = new Date().toISOString();
  const dummyAccessToken = 'dummyAccessToken';
  const dummyRefreshToken = 'dummyRefreshToken';
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const userEntity = new UserEntity(
    dummyUuid,
    dummyEmail,
    dummyUsername,
    dummyPhoneNumber,
    dummyAccessCode,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyAccessToken,
    dummyRefreshToken,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  describe('findUserByUuid', () => {
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
    const signUpRequest = new SignUpRequest('dummyUsername', 'dummyEmail', 'dummyPhoneNumber');

    it('should return an UserDTO', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(undefined);
      vi.spyOn(UserStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(instance.signUp(signUpRequest)).resolves.toBeInstanceOf(UserDTO);
    })

    it('should have an ConflictException thrown because there is already an user created with provided request body', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(userEntity);

      await expect(async () => await instance.signUp(signUpRequest)).rejects.toThrow(ConflictException);
    })

    it('should have an InternalServerException thrown because an error ocurred while calling HashProvider hash ', async () => {
      vi.spyOn(HashProvider.prototype, 'hash').mockRejectedValue(new InternalServerException());

      await expect(async () => await instance.signUp(signUpRequest)).rejects.toThrow();
    })

    it('should have an InternalServerException thrown because an error ocurred while calling repository findUserByCredentials', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockRejectedValue(InternalServerException);

      await expect(async () => await instance.signUp(signUpRequest)).rejects.toThrow(InternalServerException);
    })

    it('should have an InternalServerException thrown because an error ocurred while calling repository create', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(undefined);
      vi.spyOn(UserStateRepository.prototype, 'createOne').mockRejectedValue(InternalServerException);

      await expect(async () => await instance.signUp(signUpRequest)).rejects.toThrow(InternalServerException);
    })
  })

  describe('signIn', () => {
    const signInRequest = new SignInRequest('dummyAccessCode');

    it('should return an instanceOf UserDTO', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockResolvedValue(true);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);
      await expect(instance.signIn(signInRequest)).resolves.toBeInstanceOf(UserDTO);
    })

    it('should throw an InternalServerException because UserRepository.findBulk throws an error', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockRejectedValue(new Error());
      await expect(instance.signIn(signInRequest)).rejects.toThrow();
    })

    it('should throw an InternalServerException because UserRepository.updateTokens throws an error', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockResolvedValue(true);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockRejectedValue(new Error());
      await expect(instance.signIn(signInRequest)).rejects.toThrow();
    })
    it('should throw an InternalServerException because HashProvider.compare throws an error', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockRejectedValue(true);
      await expect(instance.signIn(signInRequest)).rejects.toThrow();
    })

    it('should throw an InternalServerException because TokenProvider.sign on AccessToken hash throws an error', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockResolvedValue(true);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockRejectedValue(new Error());
      await expect(instance.signIn(signInRequest)).rejects.toThrow();
    })

    it('should throw an BadRequestException because HashProvider.compare returns false', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockResolvedValue(false);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);
      await expect(instance.signIn(signInRequest)).rejects.toThrow();
    })

    it('should throw an BadRequestException because UserStateRepository.updateTokens returns undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findBulk').mockResolvedValue([userEntity]);
      vi.spyOn(HashProvider.prototype, 'compare').mockResolvedValue(false);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(undefined);
      await expect(instance.signIn(signInRequest)).rejects.toThrow();
    })
  })

  describe('refreshAccessCode', () => {
    const refreshAccessCodeRequest = new RefreshAccessCodeRequest(
      'dummyUsername',
      'dummyEmail',
      'dummyPhoneNumber'
    );

    async function callRefreshAccessCode (): Promise<UserDTO> {
      return await instance.refreshAccessCode(refreshAccessCodeRequest)
    }

    it('should return an instanceOf UserDTO', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(userEntity);
      vi.spyOn(RandomProvider.prototype, 'randomString').mockResolvedValue('dummyRandomString');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedRandomString');
      vi.spyOn(UserStateRepository.prototype, 'updateAccessCode').mockResolvedValue(userEntity);

      await expect(callRefreshAccessCode()).resolves.toBeInstanceOf(UserDTO);
    })

    it('should throw NonFoundException because UserRepository.FindUserByCredentials returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(undefined);
      vi.spyOn(RandomProvider.prototype, 'randomString').mockResolvedValue('dummyRandomString');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedRandomString');
      vi.spyOn(UserStateRepository.prototype, 'updateAccessCode').mockResolvedValue(userEntity);

      await expect(callRefreshAccessCode()).rejects.toThrow(NonFoundException);
    })

    it('should throw InternalServerException because HashProvider.Hash thrown an exception', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(userEntity);
      vi.spyOn(RandomProvider.prototype, 'randomString').mockResolvedValue('dummyRandomString');
      vi.spyOn(HashProvider.prototype, 'hash').mockRejectedValue(new InternalServerException());
      vi.spyOn(UserStateRepository.prototype, 'updateAccessCode').mockResolvedValue(userEntity);

      await expect(callRefreshAccessCode()).rejects.toThrow(InternalServerException);
    })

    it('should throw InternalServerException because UserRepository.UpdatedAccessCode thrown an exception', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(userEntity);
      vi.spyOn(RandomProvider.prototype, 'randomString').mockResolvedValue('dummyRandomString');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedRandomString');
      vi.spyOn(UserStateRepository.prototype, 'updateAccessCode').mockRejectedValue(new InternalServerException());

      await expect(callRefreshAccessCode()).rejects.toThrow(InternalServerException);
    })

    it('should throw NonFoundException because UserRepository.UpdatedAccessCode returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findUserByCredentials').mockResolvedValue(userEntity);
      vi.spyOn(RandomProvider.prototype, 'randomString').mockResolvedValue('dummyRandomString');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedRandomString');
      vi.spyOn(UserStateRepository.prototype, 'updateAccessCode').mockResolvedValue(undefined);

      await expect(callRefreshAccessCode()).rejects.toThrow(NonFoundException);
    })
  })

  describe('signOut', () => {
    const signOutRequest = new SignOutRequest('dummyUuid');

    async function callSignOut (): Promise<UserDTO> {
      return await instance.signOut(signOutRequest);
    }

    it('should return an instanceOf UserDTO', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);

      await expect(callSignOut()).resolves.toBeInstanceOf(UserDTO);
    })

    it('should throw NonFoundException because UserRepository.FindOneByUuid returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);

      await expect(callSignOut()).rejects.toThrow(NonFoundException);
    })

    it('should throw NonFoundException because UserRepository.UpdateTokens returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(undefined);

      await expect(callSignOut()).rejects.toThrow(NonFoundException);
    })

    it('should throw NonFoundException because UserRepository.FindOneByUuid threw an exception', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);

      await expect(callSignOut()).rejects.toThrow(InternalServerException);
    })

    it('should throw NonFoundException because UserRepository.UpdateTokens threw an exception', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockRejectedValue(new InternalServerException());

      await expect(callSignOut()).rejects.toThrow(InternalServerException);
    })
  })

  describe('refreshTokens', () => {
    const refreshTokensRequest = new RefreshTokensRequest('dummyUuid');

    async function callRefreshTokens (): Promise<UserDTO> {
      return await instance.refreshTokens(refreshTokensRequest);
    }

    it('should return an instanceOf UserDTO', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);

      await expect(callRefreshTokens()).resolves.toBeInstanceOf(UserDTO);
    })

    it('should throw NonFoundException because UserRepository.findOneByUuid returned an undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);

      await expect(callRefreshTokens()).rejects.toThrow(NonFoundException);
    })

    it('should throw InternalServerException because HashProvider.Hash threw an exception', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockRejectedValue(new InternalServerException());
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(userEntity);

      await expect(callRefreshTokens()).rejects.toThrow(InternalServerException);
    })

    it('should throw NonFoundException because UserStateRepository.UpdateTokens returned undefined', async () => {
      vi.spyOn(UserStateRepository.prototype, 'findOneByUuid').mockResolvedValue(userEntity);
      vi.spyOn(TokenProvider.prototype, 'sign').mockResolvedValue('dummyToken');
      vi.spyOn(HashProvider.prototype, 'hash').mockResolvedValue('dummyHashedToken');
      vi.spyOn(UserStateRepository.prototype, 'updateTokens').mockResolvedValue(undefined);

      await expect(callRefreshTokens()).rejects.toThrow(NonFoundException);
    })
  })
})
