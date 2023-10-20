import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { promotionProposalMapper, type PromotionProposalDTO, type PromotionProposalEntity } from './structs/promotion-proposal.domain';
import { type FindPromotionProposalsByForeignsUuidRequest, type FindPromotionProposalByUuidRequest, type CreatePromotionProposalRequest, type UpdatePromotionProposalByUuidRequest } from './structs/promotion-proposal.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type PromotionProposalRepository } from './promotion-proposal.repository';
import { PromotionProposalStateRepository } from './repositories/promotion-proposal-state.repository';

export class PromotionProposalService {
  private readonly repository: PromotionProposalRepository = new PromotionProposalStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findOneByUuid (
    { uuid }: FindPromotionProposalByUuidRequest
  ): Promise<PromotionProposalDTO> {
    const foundPromotionProposal = await this.repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundPromotionProposal === undefined) throw new NonFoundException();

    return promotionProposalMapper(foundPromotionProposal);
  }

  public async findBulkByForeignsUuid (
    { proposalUuid, promotionUuid }: FindPromotionProposalsByForeignsUuidRequest
  ): Promise<PromotionProposalEntity[]> {
    const foundPromotionProposals = await this.repository
      .findBulkByForeignsUuid(proposalUuid, promotionUuid)
      .catch(() => {
        throw new InternalServerException()
      })

    return foundPromotionProposals.map((foundPromotionProposal) => promotionProposalMapper(foundPromotionProposal));
  }

  public async createOne (
    { proposalUuid, promotionUuid }: CreatePromotionProposalRequest
  ): Promise<PromotionProposalEntity> {
    const foundPromotionProposal = await this.repository
      .findOneByForeignsUuid(proposalUuid, promotionUuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundPromotionProposal !== undefined) throw new ConflictException();

    const createdPromotionProposal: PromotionProposalEntity = {
      uuid: this.randomProvider.randomUUID(),
      proposalUuid,
      promotionUuid,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createdPromotionProposal)
      .catch(() => { throw new InternalServerException() })

    return promotionProposalMapper(createdPromotionProposal);
  }

  public async updateOneByUuid (
    { uuid, active }: UpdatePromotionProposalByUuidRequest
  ): Promise<PromotionProposalEntity> {
    const foundPromotionProposal = await this.repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundPromotionProposal === undefined) throw new NonFoundException();

    const updatePromotionProposal: PromotionProposalEntity = {
      uuid: foundPromotionProposal.uuid,
      proposalUuid: foundPromotionProposal.proposalUuid,
      promotionUuid: foundPromotionProposal.promotionUuid,
      active,
      createdAt: foundPromotionProposal.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updatePromotionProposal)
      .catch(() => { throw new InternalServerException() })

    return promotionProposalMapper(updatePromotionProposal);
  }
}
