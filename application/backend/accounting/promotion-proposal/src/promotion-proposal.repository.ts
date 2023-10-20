import { type PromotionProposalEntity } from './structs/promotion-proposal.domain';

export interface PromotionProposalRepository {
  findOneByUuid(uuid: string): Promise<PromotionProposalEntity | undefined>
  findBulkByForeignsUuid(
    proposalUuid: string | undefined,
    promotionUuid: string | undefined
  ): Promise<PromotionProposalEntity[]>
  findOneByForeignsUuid(
    proposalUuid: string,
    promotionUuid: string
  ): Promise<PromotionProposalEntity | undefined>
  createOne(
    PromotionProposalEntity: PromotionProposalEntity
  ): Promise<void>
  updateOneByUuid(
    PromotionProposalEntity: PromotionProposalEntity
  ): Promise<void>
}
