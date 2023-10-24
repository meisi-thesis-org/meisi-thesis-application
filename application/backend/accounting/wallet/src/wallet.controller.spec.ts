import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { WalletController } from './wallet.controller';
import { type WalletDTO } from './structs/wallet.domain';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  const instance = new WalletController();

  it('should have an instance of WalletController', () => {
    expect(instance).toBeInstanceOf(WalletController);
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomBoolean = randomProvider.randomBoolean();
  const randomUuid = randomProvider.randomUUID();
  const randomNumber = randomProvider.randomNumber();
  const randomDateBirth = new Date().toISOString();

  const walletDTO: WalletDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    funds: randomNumber,
    active: randomBoolean,
    enabled: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findWalletByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
    })

    async function callFindWalletByUuid (): Promise<Response> {
      return await instance.findWalletByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(WalletService.prototype, 'findWalletByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindWalletByUuid()).resolves.toEqual(new Error());
    })

    it('should return a walletDTO', async () => {
      vi.spyOn(WalletService.prototype, 'findWalletByUuid').mockResolvedValue(walletDTO);
      defineResponseMock(walletDTO);

      await expect(callFindWalletByUuid()).resolves.toEqual(walletDTO);
    })
  })

  describe('findWalletByUserUuid', () => {
    beforeEach(() => {
      requestMock.query = {
        ...requestMock.query,
        userUuid: randomUuid
      }
    })

    async function callFindWalletsByForeignsUuid (): Promise<Response> {
      return await instance.findWalletByUserUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(WalletService.prototype, 'findWalletByUserUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindWalletsByForeignsUuid()).resolves.toEqual(new Error());
    })

    it('should return a walletDTO collection', async () => {
      vi.spyOn(WalletService.prototype, 'findWalletByUserUuid').mockResolvedValue(walletDTO);
      defineResponseMock(walletDTO);

      await expect(callFindWalletsByForeignsUuid()).resolves.toEqual(walletDTO);
    })
  })

  describe('createWallet', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        userUuid: randomUuid
      }
    })

    async function callCreaateWallet (): Promise<Response> {
      return await instance.createWallet(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(WalletService.prototype, 'createWallet').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreaateWallet()).resolves.toEqual(new Error());
    })

    it('should return a walletDTO', async () => {
      vi.spyOn(WalletService.prototype, 'createWallet').mockResolvedValue(walletDTO);
      defineResponseMock(walletDTO);

      await expect(callCreaateWallet()).resolves.toEqual(walletDTO);
    })
  })

  describe('updateWalletByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: randomUuid }
      requestMock.body = { ...requestMock.body, funds: randomNumber, active: randomBoolean, enabled: randomBoolean }
    })

    async function callUpdateWalletByUuid (): Promise<Response> {
      return await instance.updateWalletByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(WalletService.prototype, 'updateWalletByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callUpdateWalletByUuid()).resolves.toEqual(new Error());
    })

    it('should return a walletDTO', async () => {
      vi.spyOn(WalletService.prototype, 'updateWalletByUuid').mockResolvedValue(walletDTO);
      defineResponseMock(walletDTO);

      await expect(callUpdateWalletByUuid()).resolves.toEqual(walletDTO);
    })
  })
})
