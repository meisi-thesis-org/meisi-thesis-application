import { describe, expect, it, vi } from 'vitest';
import { PromotionProposalService } from './promotion-proposal.service';
import { type FindPromotionProposalsByForeignsUuidRequest, type FindPromotionProposalByUuidRequest, type CreatePromotionProposalRequest, type UpdatePromotionProposalByUuidRequest } from './structs/promotion-proposal.request';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { PromotionProposalStateRepository } from './repositories/promotion-proposal-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type PromotionProposalDTO, type PromotionProposalEntity } from './structs/promotion-proposal.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('PromotionProposalService', () => {
  const instance = new PromotionProposalService();
  const randomProvider = new RandomProvider();

  const dummyUuid = randomProvider.randomUUID();
  const dummyBoolean = randomProvider.randomBoolean();
  const dummyDate = randomProvider.randomDateToIsoString();

  const entity: PromotionProposalEntity = {
    uuid: dummyUuid,
    proposalUuid: dummyUuid,
    promotionUuid: dummyUuid,
    active: dummyBoolean,
    createdAt: dummyDate,
    updatedAt: dummyDate
  }

  describe('findOneByUuid', () => {
    const requestArgs: FindPromotionProposalByUuidRequest = { uuid: dummyUuid };

    async function findOneByUuid (): Promise<PromotionProposalDTO> {
      return await instance.findOneByUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByUuid threw an error', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await findOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an NonFoundException because repository findOneByUuid returned undefined', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(async () => await findOneByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should strictly equal entity because repository findOneByUuid returned an entity', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      await expect(findOneByUuid()).resolves.toStrictEqual(entity);
    })
  })
  describe('findBulkByForeignsUuid', () => {
    const requestArgs: FindPromotionProposalsByForeignsUuidRequest = {
      proposalUuid: dummyUuid,
      promotionUuid: dummyUuid
    };

    async function findBulkByForeignsUuid (): Promise<PromotionProposalDTO[]> {
      return await instance.findBulkByForeignsUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findBulkByForeignsUuid threw an error', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findBulkByForeignsUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await findBulkByForeignsUuid()).rejects.toThrow(InternalServerException);
    })

    it('should strictly equal entity collection because repository findBulkByForeignsUuid returned an entity collection', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findBulkByForeignsUuid').mockResolvedValue([entity]);
      await expect(findBulkByForeignsUuid()).resolves.toStrictEqual([entity]);
    })
  })
  describe('createOne', () => {
    const requestArgs: CreatePromotionProposalRequest = {
      proposalUuid: dummyUuid,
      promotionUuid: dummyUuid
    };

    async function createOne (): Promise<PromotionProposalDTO> {
      return await instance.createOne(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByForeignsUuid threw an error', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByForeignsUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await createOne()).rejects.toThrow(InternalServerException);
    })

    it('should throw an ConflictException because repository findOneByForeignsUuid returned an entity', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(entity);
      await expect(async () => await createOne()).rejects.toThrow(ConflictException);
    })

    it('should throw an InternalServerException because repository findOneByForeignsUuid returned an undefined', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(undefined);
      vi.spyOn(PromotionProposalStateRepository.prototype, 'createOne').mockRejectedValue(new InternalServerException());
      await expect(async () => await createOne()).rejects.toThrow(InternalServerException);
    })

    it('should be defined because repository createOne returned an entity', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(undefined);
      vi.spyOn(PromotionProposalStateRepository.prototype, 'createOne').mockResolvedValue();
      await expect(createOne()).resolves.toBeDefined();
    })
  })
  describe('updateOneByUuid', () => {
    const requestArgs: UpdatePromotionProposalByUuidRequest = {
      uuid: dummyUuid,
      active: dummyBoolean
    };

    async function updateOneByUuid (): Promise<PromotionProposalDTO> {
      return await instance.updateOneByUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByForeignsUuid threw an error', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockRejectedValue(InternalServerException);
      vi.spyOn(PromotionProposalStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(async () => await updateOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an NonFoundException because repository findOneByUuid returned an undefined', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(PromotionProposalStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(async () => await updateOneByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because repository findOneByUuid returned an undefined', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      vi.spyOn(PromotionProposalStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await updateOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should be defined because repository updateOneByUuid returned an entity', async () => {
      vi.spyOn(PromotionProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      vi.spyOn(PromotionProposalStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(updateOneByUuid()).resolves.toBeDefined()
    })
  })
})
