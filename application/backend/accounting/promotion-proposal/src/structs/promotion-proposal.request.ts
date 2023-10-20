import { type PromotionProposalEntity } from './promotion-proposal.domain'

type FindPromotionProposalByUuidRequest = Readonly<Pick<PromotionProposalEntity, 'uuid'>>
type FindPromotionProposalsByForeignsUuidRequest = Partial<Readonly<Pick<PromotionProposalEntity, 'proposalUuid' | 'promotionUuid'>>>
type CreatePromotionProposalRequest = Readonly<Pick<PromotionProposalEntity, 'proposalUuid' | 'promotionUuid'>>
type UpdatePromotionProposalByUuidRequest = Readonly<Pick<PromotionProposalEntity, 'uuid' | 'active'>>

export type {
  FindPromotionProposalByUuidRequest,
  FindPromotionProposalsByForeignsUuidRequest,
  CreatePromotionProposalRequest,
  UpdatePromotionProposalByUuidRequest
}
