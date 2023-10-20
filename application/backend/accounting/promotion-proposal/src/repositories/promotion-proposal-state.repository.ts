import { type PromotionProposalRepository } from '../promotion-proposal.repository';
import { type PromotionProposalEntity } from '../structs/promotion-proposal.domain';

export class PromotionProposalStateRepository implements PromotionProposalRepository {
  private readonly promotionProposals = new Array<PromotionProposalEntity>();

  public async findOneByUuid (
    uuid: string
  ): Promise<PromotionProposalEntity | undefined> {
    return this.promotionProposals.find((promotionProposal) => promotionProposal.uuid === uuid && promotionProposal.active)
  }

  public async findBulkByForeignsUuid (
    proposalUuid: string | undefined,
    promotionUuid: string | undefined
  ): Promise<PromotionProposalEntity[]> {
    if (proposalUuid !== undefined && promotionUuid !== undefined) {
      return this.promotionProposals.filter((PromotionProposal) =>
        PromotionProposal.proposalUuid === proposalUuid &&
        PromotionProposal.promotionUuid === promotionUuid &&
        PromotionProposal.active
      )
    }

    if (proposalUuid !== undefined && promotionUuid === undefined) {
      return this.promotionProposals.filter((promotionProposal) =>
        promotionProposal.proposalUuid === proposalUuid &&
        promotionProposal.active
      )
    }

    if (proposalUuid === undefined && promotionUuid !== undefined) {
      return this.promotionProposals.filter((promotionProposal) =>
        promotionProposal.promotionUuid === promotionUuid &&
      promotionProposal.active
      )
    }

    return []
  }

  public async findOneByForeignsUuid (
    proposalUuid: string,
    promotionUuid: string
  ): Promise<PromotionProposalEntity | undefined> {
    return this.promotionProposals.find((promotionProposal) =>
      promotionProposal.proposalUuid === proposalUuid &&
      promotionProposal.promotionUuid === promotionUuid &&
      promotionProposal.active
    )
  }

  public async createOne (promotionProposalEntity: PromotionProposalEntity): Promise<void> {
    this.promotionProposals.push(promotionProposalEntity)
  }

  public async updateOneByUuid (promotionProposalEntity: PromotionProposalEntity): Promise<void> {
    this.promotionProposals.find((promotionProposal) => {
      if (promotionProposal.uuid === promotionProposalEntity.uuid) {
        promotionProposal = { ...promotionProposal, ...promotionProposalEntity }
      }

      return promotionProposal
    })
  }
}
