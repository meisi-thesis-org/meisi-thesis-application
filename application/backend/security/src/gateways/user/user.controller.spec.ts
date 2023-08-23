import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserController } from './user.controller';
import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { UserDTO } from './domain/user.domain';
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
})
