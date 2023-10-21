import { describe, expect, it, vi } from 'vitest';
import { ProposalCommerceService } from './proposal-commerce.service';
import { type FindProposalCommercesByForeignsUuidRequest, type FindProposalCommerceByUuidRequest, type CreateProposalCommerceRequest, type UpdateProposalCommerceByUuidRequest } from './structs/proposal-commerce.request';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { ProposalCommerceStateRepository } from './repositories/proposal-commerce-state.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type ProposalCommerceDTO, type ProposalCommerceEntity } from './structs/proposal-commerce.domain';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

describe('ProposalCommerceService', () => {
  const instance = new ProposalCommerceService();
  const randomProvider = new RandomProvider();

  const dummyUuid = randomProvider.randomUUID();
  const dummyBoolean = randomProvider.randomBoolean();
  const dummyDate = randomProvider.randomDateToIsoString();

  const entity: ProposalCommerceEntity = {
    uuid: dummyUuid,
    proposalUuid: dummyUuid,
    chapterUuid: dummyUuid,
    bookUuid: dummyUuid,
    dossierUuid: dummyUuid,
    active: dummyBoolean,
    createdAt: dummyDate,
    updatedAt: dummyDate
  }

  describe('findOneByUuid', () => {
    const requestArgs: FindProposalCommerceByUuidRequest = { uuid: dummyUuid };

    async function findOneByUuid (): Promise<ProposalCommerceDTO> {
      return await instance.findOneByUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByUuid threw an error', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await findOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an NonFoundException because repository findOneByUuid returned undefined', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      await expect(async () => await findOneByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should strictly equal entity because repository findOneByUuid returned an entity', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      await expect(findOneByUuid()).resolves.toStrictEqual(entity);
    })
  })
  describe('findBulkByForeignsUuid', () => {
    const requestArgs: FindProposalCommercesByForeignsUuidRequest = {
      proposalUuid: dummyUuid,
      chapterUuid: dummyUuid
    };

    async function findBulkByForeignsUuid (): Promise<ProposalCommerceDTO[]> {
      return await instance.findBulkByForeignsUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findBulkByForeignsUuid threw an error', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findBulkByForeignsUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await findBulkByForeignsUuid()).rejects.toThrow(InternalServerException);
    })

    it('should strictly equal entity collection because repository findBulkByForeignsUuid returned an entity collection', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findBulkByForeignsUuid').mockResolvedValue([entity]);
      await expect(findBulkByForeignsUuid()).resolves.toStrictEqual([entity]);
    })
  })
  describe('createOne', () => {
    const requestArgs: CreateProposalCommerceRequest = {
      proposalUuid: dummyUuid,
      chapterUuid: dummyUuid,
      bookUuid: dummyUuid,
      dossierUuid: dummyUuid
    };

    async function createOne (): Promise<ProposalCommerceDTO> {
      return await instance.createOne(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByForeignsUuid threw an error', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByForeignsUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await createOne()).rejects.toThrow(InternalServerException);
    })

    it('should throw an ConflictException because repository findOneByForeignsUuid returned an entity', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(entity);
      await expect(async () => await createOne()).rejects.toThrow(ConflictException);
    })

    it('should throw an InternalServerException because repository findOneByForeignsUuid returned an undefined', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(undefined);
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'createOne').mockRejectedValue(new InternalServerException());
      await expect(async () => await createOne()).rejects.toThrow(InternalServerException);
    })

    it('should be defined because repository createOne returned an entity', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByForeignsUuid').mockResolvedValue(undefined);
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'createOne').mockResolvedValue();
      await expect(createOne()).resolves.toBeDefined();
    })
  })
  describe('updateOneByUuid', () => {
    const requestArgs: UpdateProposalCommerceByUuidRequest = {
      uuid: dummyUuid,
      active: dummyBoolean
    };

    async function updateOneByUuid (): Promise<ProposalCommerceDTO> {
      return await instance.updateOneByUuid(requestArgs)
    }

    it('should throw an InternalServerException because repository findOneByForeignsUuid threw an error', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockRejectedValue(InternalServerException);
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(async () => await updateOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should throw an NonFoundException because repository findOneByUuid returned an undefined', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(async () => await updateOneByUuid()).rejects.toThrow(NonFoundException);
    })

    it('should throw an InternalServerException because repository findOneByUuid returned an undefined', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new InternalServerException());
      await expect(async () => await updateOneByUuid()).rejects.toThrow(InternalServerException);
    })

    it('should be defined because repository updateOneByUuid returned an entity', async () => {
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'findOneByUuid').mockResolvedValue(entity);
      vi.spyOn(ProposalCommerceStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();
      await expect(updateOneByUuid()).resolves.toBeDefined()
    })
  })
})
