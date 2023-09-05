import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserController } from './user.controller';
import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { type UserDTO } from './structs/user.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';

describe('UserController', () => {
  const instance = new UserController();

  it('should have an instanceOf UserController', () => {
    expect(instance).toBeInstanceOf(UserController)
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const userDTO: UserDTO = {
    uuid: randomUuid,
    username: randomString,
    email: randomString,
    phoneNumber: randomString,
    firstName: randomString,
    lastName: randomString,
    dateBirth: randomString,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findUserByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
    })

    async function callFindUserByUuid (): Promise<Response> {
      return await instance.findUserByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'findUserByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindUserByUuid()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO collection', async () => {
      vi.spyOn(UserService.prototype, 'findUserByUuid').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callFindUserByUuid()).resolves.toEqual(userDTO);
    })
  })

  describe('createUser', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        username: randomString,
        email: randomString,
        phoneNumber: randomString
      }
    })

    async function callCreateUser (): Promise<Response> {
      return await instance.createUser(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'createUser').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateUser()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO collection', async () => {
      vi.spyOn(UserService.prototype, 'createUser').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callCreateUser()).resolves.toEqual(userDTO);
    })
  })

  describe('updateUserByUuid', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        uuid: randomUuid,
        username: randomString,
        email: randomString,
        phoneNumber: randomString,
        firstName: randomString,
        lastName: randomString,
        dateBirth: randomDateBirth
      }
    })

    async function callUpdateUserByUuid (): Promise<Response> {
      return await instance.updateUserByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'updateUserByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateUserByUuid()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO collection', async () => {
      vi.spyOn(UserService.prototype, 'updateUserByUuid').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callUpdateUserByUuid()).resolves.toEqual(userDTO);
    })
  })

  describe('updateUserByUuid', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        uuid: randomUuid
      }
    })

    async function callUpdateUserAccessCode (): Promise<Response> {
      return await instance.updateUserAccessCode(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'updateUserAccessCode').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateUserAccessCode()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO collection', async () => {
      vi.spyOn(UserService.prototype, 'updateUserAccessCode').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callUpdateUserAccessCode()).resolves.toEqual(userDTO);
    })
  })

  describe('findUserByAccessCode', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, accessCode: 'accessCode' }
    })

    async function callFindUserByAccessCode (): Promise<Response> {
      return await instance.findUserByAccessCode(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(UserService.prototype, 'findUserByAccessCode').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindUserByAccessCode()).resolves.toEqual(new Error());
    })

    it('should return an UserDTO collection', async () => {
      vi.spyOn(UserService.prototype, 'findUserByAccessCode').mockResolvedValue(userDTO);
      defineResponseMock(userDTO);

      await expect(callFindUserByAccessCode()).resolves.toEqual(userDTO);
    })
  })
})
