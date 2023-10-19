import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProposalService } from './proposal.service';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type ProposalEntity } from './structs/proposal.domain';
import { ProposalStateRepository } from './repositories/proposal-state.repository';

describe('ProposalService', () => {
  const instance = new ProposalService();

  afterEach(() => {
    vi.clearAllMocks();
  })

  const randomProvider = new RandomProvider();

  const proposalEntity: ProposalEntity = {
    uuid: randomProvider.randomUUID(),
    designation: randomProvider.randomString(10),
    description: randomProvider.randomString(10),
    price: randomProvider.randomNumber(),
    visible: randomProvider.randomBoolean(),
    active: randomProvider.randomBoolean(),
    createdAt: randomProvider.randomDateToIsoString(),
    updatedAt: randomProvider.randomDateToIsoString()
  }

  describe('findBulk', () => {
    async function callFindBulk () {
      return await instance.findBulk();
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findBulk').mockRejectedValue(new Error());

      await expect(async () => await callFindBulk()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan collection', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findBulk').mockResolvedValue([proposalEntity]);
      await expect(callFindBulk()).resolves.resolves.toBeTruthy();
    })
  })

  describe('findOneByUuid', () => {
    async function callFindOneByUuid () {
      return await instance.findOneByUuid({ uuid: 'dummyUuid' });
    }

    it('should have an InternalServerException because service threw an error', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service threw an error', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callFindOneByUuid()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan collection', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(proposalEntity);
      await expect(callFindOneByUuid()).resolves.toBeTruthy();
    })
  })

  describe('createOne', () => {
    async function callCreateOne () {
      return await instance.createOne({
        designation: proposalEntity.designation,
        description: proposalEntity.description,
        price: proposalEntity.price
      });
    }

    it('should have an InternalServerException because service findOneByDesignation threw an error', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByDesignation').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an ConflictException because service findOneByDesignation returned an entity', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(proposalEntity);
      vi.spyOn(ProposalStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have an InternalServerException because service createOne threw an error', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(ProposalStateRepository.prototype, 'createOne').mockRejectedValue(new Error());

      await expect(async () => await callCreateOne()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan entity', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByDesignation').mockResolvedValue(undefined);
      vi.spyOn(ProposalStateRepository.prototype, 'createOne').mockResolvedValue();

      await expect(callCreateOne()).resolves.toBeTruthy();
    })
  })

  describe('updateOneByUuid', () => {
    async function callUpdateOneByUuid () {
      return await instance.updateOneByUuid({
        uuid: proposalEntity.uuid
      });
    }

    it('should have an InternalServerException because service findOneByUuid threw an error', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service findOneByUuid returned undefined', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have an NonFoundException because service updateOneByUuid returned undefined', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(undefined);
      vi.spyOn(ProposalStateRepository.prototype, 'updateOneByUuid').mockRejectedValue(new Error());

      await expect(async () => await callUpdateOneByUuid()).rejects.toThrow()
    })

    it('should have a SubscriptionPlan entity', async () => {
      vi.spyOn(ProposalStateRepository.prototype, 'findOneByUuid').mockResolvedValue(proposalEntity);
      vi.spyOn(ProposalStateRepository.prototype, 'updateOneByUuid').mockResolvedValue();

      await expect(callUpdateOneByUuid()).resolves.toBeTruthy();
    })
  })
})
