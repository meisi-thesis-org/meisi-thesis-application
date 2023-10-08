import { describe, it, expect, vi } from 'vitest';
import { NetworkService } from './network.service';
import { type NetworkDTO } from './structs/network.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkStateRepository } from './repositories/network-state.repository';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';

describe('NetworkService', () => {
  const instance = new NetworkService();

  it('should have an instanceOf NetworkService', () => {
    expect(instance).toBeInstanceOf(NetworkService);
  })

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomUuid = randomProvider.randomUUID();
  const randomDate = new Date().toISOString();

  const networkDTO: NetworkDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    coordinateX: randomString,
    coordinateY: randomString,
    visible: true,
    active: true,
    createdAt: randomDate,
    updatedAt: randomDate
  }

  describe('findNetworksByUserUuid', () => {
    async function callFindNetworksByUserUuid (): Promise<NetworkDTO[]> {
      return await instance.findNetworksByUserUuid({
        userUuid: randomUuid
      })
    }

    it('should have response toEqual a NetworkDTO collection', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworksByUserUuid').mockResolvedValue([networkDTO]);
      await expect(callFindNetworksByUserUuid()).resolves.toEqual([networkDTO])
    })

    it('should have an InternalServerException because NetworkStateRepository.findNetworks threw InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworksByUserUuid').mockRejectedValue(InternalServerException);
      await expect(callFindNetworksByUserUuid()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('findNetworkByUuid', () => {
    async function callFindNetworkByUuid (): Promise<NetworkDTO> {
      return await instance.findNetworkByUuid({
        uuid: randomUuid
      })
    }

    it('should have response toEqual a NetworkDTO', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockResolvedValue(networkDTO);
      await expect(callFindNetworkByUuid()).resolves.toEqual(networkDTO)
    })

    it('should have an InternalServerException because NetworkStateRepository.findNetworks threw InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockRejectedValue(InternalServerException);
      await expect(callFindNetworkByUuid()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('createNetwork', () => {
    async function callCreateCollection (): Promise<NetworkDTO> {
      return await instance.createNetwork({
        userUuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString
      })
    }

    it('should have a response to be defined', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(NetworkStateRepository.prototype, 'createNetwork').mockResolvedValue()

      await expect(callCreateCollection()).resolves.toBeDefined()
    })

    it('should throw an InternalServerException because NetworkStateRepository.findNetworkByProps threw InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByProps').mockRejectedValue(InternalServerException)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(NetworkStateRepository.prototype, 'createNetwork').mockResolvedValue()

      await expect(async () => await callCreateCollection()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an ConflictException because NetworkStateRepository.findNetworkByProps threw ConflictException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByProps').mockResolvedValue(networkDTO)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(NetworkStateRepository.prototype, 'createNetwork').mockResolvedValue()

      await expect(async () => await callCreateCollection()).rejects.toThrowError(ConflictException)
    })

    it('should throw an InternalServerException because NetworkProvider.doHttpRequest threw InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockRejectedValue(InternalServerException)
      vi.spyOn(NetworkStateRepository.prototype, 'createNetwork').mockResolvedValue()

      await expect(async () => await callCreateCollection()).rejects.toEqual(InternalServerException)
    })

    it('should throw an InternalServerException because NetworkStateRepository.createNetwork threw InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByProps').mockResolvedValue(undefined)
      vi.spyOn(NetworkProvider.prototype, 'doHttpRequest').mockResolvedValue({})
      vi.spyOn(NetworkStateRepository.prototype, 'createNetwork').mockRejectedValue(InternalServerException)

      await expect(async () => await callCreateCollection()).rejects.toThrowError(InternalServerException)
    })
  })

  describe('updateNetworkByUuid', () => {
    async function callUpdateNetworkByUuid (): Promise<NetworkDTO> {
      return await instance.updateNetworkByUuid({
        uuid: randomUuid,
        coordinateX: randomString,
        coordinateY: randomString,
        active: true,
        visible: true
      })
    }

    it('should be defined', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockResolvedValue(networkDTO);
      vi.spyOn(NetworkStateRepository.prototype, 'updateNetworkByUuid').mockResolvedValue(networkDTO);
      await expect(callUpdateNetworkByUuid()).resolves.toBeDefined()
    })

    it('should throw an InternalServerException because NetworkStateRepository.findNetworkByUuid threw an InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockRejectedValue(InternalServerException);
      vi.spyOn(NetworkStateRepository.prototype, 'updateNetworkByUuid').mockResolvedValue(networkDTO);
      await expect(async () => await callUpdateNetworkByUuid()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an NonFoundException because NetworkStateRepository.findNetworkByUuid threw an NonFoundException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockResolvedValue(undefined);
      vi.spyOn(NetworkStateRepository.prototype, 'updateNetworkByUuid').mockResolvedValue(networkDTO);
      await expect(async () => await callUpdateNetworkByUuid()).rejects.toThrowError(NonFoundException)
    })

    it('should throw an InternalServerException because NetworkStateRepository.updateNetworkByUuid threw an InternalServerException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockResolvedValue(networkDTO);
      vi.spyOn(NetworkStateRepository.prototype, 'updateNetworkByUuid').mockRejectedValue(InternalServerException);
      await expect(async () => await callUpdateNetworkByUuid()).rejects.toThrowError(InternalServerException)
    })

    it('should throw an NonFoundException because NetworkStateRepository.updateNetworkByUuid threw an NonFoundException', async () => {
      vi.spyOn(NetworkStateRepository.prototype, 'findNetworkByUuid').mockResolvedValue(networkDTO);
      vi.spyOn(NetworkStateRepository.prototype, 'updateNetworkByUuid').mockResolvedValue(undefined);
      await expect(async () => await callUpdateNetworkByUuid()).rejects.toThrowError(NonFoundException)
    })
  })
})
