import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserController } from './user.controller';
import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { UserDTO } from './domain/user.dto';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

describe('UserController', () => {
  const instance = new UserController();

  it('should have an instanceOf UserController', () => {
    expect(instance).instanceOf(UserController);
  })

  const dummyUuid = new RandomProvider().randomUUID();
  const dummyEmail = 'dummyEmail';
  const dummyUsername = 'dummyUsername';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = new Date().toISOString();
  const dummyAccessToken = 'dummyAccessToken';
  const dummyRefreshToken = 'dummyRefreshToken';
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const userDTO = new UserDTO(
    dummyUuid,
    dummyEmail,
    dummyUsername,
    dummyPhoneNumber,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyAccessToken,
    dummyRefreshToken,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  describe('findUserByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
      vi.mock('user.service', () => ({
        findUserByUuid: vi.fn()
      }))
    })

    async function callFindUserByUuid (): Promise<Response> {
      return await instance.findUserByUuid(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'findUserByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error());

      await expect(callFindUserByUuid()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(UserService.prototype, 'findUserByUuid').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callFindUserByUuid()).resolves.toEqual(userDTO);
    })
  })

  describe('signUp', () => {
    beforeEach(() => {
      requestMock.body = { username: 'dummyUsername', email: 'dummyEmail', phoneNumber: 'dummyPhoneNumber' }
      vi.mock('user.service', () => ({
        signUp: vi.fn()
      }))
    })

    async function callSignUp (): Promise<Response> {
      return await instance.signUp(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'findUserByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error());

      await expect(callSignUp()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(UserService.prototype, 'signUp').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callSignUp()).resolves.toEqual(userDTO);
    })
  })

  describe('signIn', () => {
    beforeEach(() => {
      requestMock.body = { accessCode: 'dummyAccessCode' }
      vi.mock('user.service', () => ({
        signIn: vi.fn()
      }))
    })

    async function callSignIn (): Promise<Response> {
      return await instance.signIn(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'findUserByUuid').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error());

      await expect(callSignIn()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(UserService.prototype, 'signUp').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callSignIn()).resolves.toEqual(userDTO);
    })
  })

  describe('signOut', () => {
    beforeEach(() => {
      requestMock.params = { uuid: 'dummyUuid' }
      vi.mock('user.service', () => ({
        signOut: vi.fn()
      }))
    })

    async function callSignOut (): Promise<Response> {
      return await instance.signOut(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'signOut').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error());

      await expect(callSignOut()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(UserService.prototype, 'signOut').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callSignOut()).resolves.toEqual(userDTO);
    })
  })

  describe('refreshAccessCode', () => {
    beforeEach(() => {
      requestMock.body = { username: 'dummyUsername', email: 'dummyEmail', phoneNumber: 'dummyPhoneNumber' }
      vi.mock('user.service', () => ({
        refreshAccessCode: vi.fn()
      }))
    })

    async function callRefreshAccessCode (): Promise<Response> {
      return await instance.refreshAccessCode(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'refreshAccessCode').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error());

      await expect(callRefreshAccessCode()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(UserService.prototype, 'refreshAccessCode').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callRefreshAccessCode()).resolves.toEqual(userDTO);
    })
  })

  describe('refreshTokens', () => {
    beforeEach(() => {
      requestMock.params = { uuid: 'dummyUuid' }
      vi.mock('user.service', () => ({
        refreshTokens: vi.fn()
      }))
    })

    async function callRefreshTokens (): Promise<Response> {
      return await instance.refreshTokens(requestMock, responseMock);
    }

    function defineResponseMock<T> (jsonResponse: T): void {
      responseMock.json = vi.fn().mockReturnValue(jsonResponse);
      responseMock.status = vi.fn(() => responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'refreshTokens').mockRejectedValue({
        getHttpCode: vi.fn()
      });
      defineResponseMock(new Error());

      await expect(callRefreshTokens()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO', async () => {
      vi.spyOn(UserService.prototype, 'refreshTokens').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callRefreshTokens()).resolves.toEqual(userDTO);
    })
  })
})
