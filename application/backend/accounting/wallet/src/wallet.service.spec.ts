import { describe, expect, it, vi } from 'vitest';
import { WalletService } from './wallet.service';
import { walletMapper, type WalletEntity } from './structs/wallet.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { WalletStateRepository } from './repositories/wallet-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { BadRequestException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/bad-request.exception';

describe('WalletService', () => {
  const instance = new WalletService();

  it('should have an instance of WalletService', () => {
    expect(instance).toBeInstanceOf(WalletService);
  })

  const randomProvider = new RandomProvider();

  const randomBoolean = randomProvider.randomBoolean();
  const randomUuid = randomProvider.randomUUID();
  const randomNumber = randomProvider.randomNumber();
  const randomDateBirth = new Date().toISOString();

  const walletEntity: WalletEntity = {
    uuid: randomUuid,
    userUuid: randomUuid,
    funds: randomNumber,
    active: randomBoolean,
    visible: randomBoolean,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findWalletByUuid', () => {
    async function callFindWalletByUuid (): Promise<WalletEntity> {
      return await instance.findWalletByUuid({
        uuid: randomUuid
      })
    }

    it('should have returned a walletDTO', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockResolvedValue(walletEntity)
      await expect(callFindWalletByUuid()).resolves.toEqual(walletMapper(walletEntity))
    })

    it('should throw a NonFoundException because Repository.findWalletByUuid returned undefined ', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockResolvedValue(undefined)
      await expect(callFindWalletByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findWalletByUuid threw InternalServerException ', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindWalletByUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('findWalletByUserUuid', () => {
    async function callFindWalletByForeignsUuid (): Promise<WalletEntity> {
      return await instance.findWalletByUserUuid({
        userUuid: randomUuid
      })
    }

    it('should have returned a walletDTO collection', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(walletEntity)
      await expect(callFindWalletByForeignsUuid()).resolves.toEqual(walletEntity)
    })

    it('should throw a NonFoundException because Repository.findWalletByUserUuid returned undefined', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(undefined)
      await expect(callFindWalletByForeignsUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findWalletByUserUuid threw InternalServerException', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockRejectedValue(new InternalServerException())
      await expect(callFindWalletByForeignsUuid()).rejects.toThrow(InternalServerException)
    })
  })

  describe('createWallet', () => {
    async function callCreateWallet (): Promise<WalletEntity> {
      return await instance.createWallet({
        userUuid: randomUuid
      })
    }

    it('should be defined', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: true });
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(undefined)
      vi.spyOn(WalletStateRepository.prototype, 'createWallet').mockResolvedValue()
      await expect(callCreateWallet()).resolves.toBeDefined()
    })

    it('should throw a ConflictException because Repository.findWalletByUserUuid returned undefined', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: true });
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(walletEntity)
      await expect(callCreateWallet()).rejects.toThrow(ConflictException)
    })

    it('should throw a InternalServerException because Repository.findWalletByUserUuid threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: true });
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockRejectedValue(new InternalServerException())
      await expect(callCreateWallet()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createWallet threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: true });
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(undefined)
      vi.spyOn(WalletStateRepository.prototype, 'createWallet').mockRejectedValue(new InternalServerException())
      await expect(callCreateWallet()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because NetworkProvider.doHttpRequest threw InternalServerException', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockRejectedValue(new InternalServerException());
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(undefined)
      await expect(callCreateWallet()).rejects.toThrow(InternalServerException)
    })

    it('should throw a BadRequestException because NetworkProvider.doHttpRequest return an inactive entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: false, visible: true });
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(undefined)
      await expect(callCreateWallet()).rejects.toThrow(BadRequestException)
    })

    it('should throw a BadRequestException because NetworkProvider.doHttpRequest return an disabled entity', async () => {
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({ active: true, visible: false });
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUserUuid').mockResolvedValue(undefined)
      await expect(callCreateWallet()).rejects.toThrow(BadRequestException)
    })
  })

  describe('updateWalletByUuid', () => {
    async function callUpdateWalletByUuid (): Promise<WalletEntity> {
      return await instance.updateWalletByUuid({
        uuid: randomUuid,
        funds: randomNumber,
        active: randomBoolean,
        visible: randomBoolean
      })
    }

    it('should be defined', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockResolvedValue(walletEntity)
      vi.spyOn(WalletStateRepository.prototype, 'updateWalletByUuid').mockResolvedValue()
      await expect(callUpdateWalletByUuid()).resolves.toBeDefined()
    })

    it('should throw a NonFoundException because Repository.findWalletByUuid returned undefined', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockResolvedValue(undefined)
      await expect(callUpdateWalletByUuid()).rejects.toThrow(NonFoundException)
    })

    it('should throw a InternalServerException because Repository.findWalletByUuid threw InternalServerException', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateWalletByUuid()).rejects.toThrow(InternalServerException)
    })

    it('should throw a InternalServerException because Repository.createWallet threw InternalServerException', async () => {
      vi.spyOn(WalletStateRepository.prototype, 'findWalletByUuid').mockResolvedValue(walletEntity)
      vi.spyOn(WalletStateRepository.prototype, 'updateWalletByUuid').mockRejectedValue(new InternalServerException())
      await expect(callUpdateWalletByUuid()).rejects.toThrow(InternalServerException)
    })
  })
})
