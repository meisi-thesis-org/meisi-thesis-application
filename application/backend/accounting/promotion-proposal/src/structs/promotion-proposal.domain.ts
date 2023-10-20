type PromotionProposalEntity = {
  readonly uuid: string
  proposalUuid: string
  promotionUuid: string
  active: boolean
  readonly createdAt: string
  updatedAt: string
}
type PromotionProposalDTO = Readonly<PromotionProposalEntity>
const promotionProposalMapper = (entity: PromotionProposalEntity): PromotionProposalDTO => {
  return {
    uuid: entity.uuid,
    proposalUuid: entity.proposalUuid,
    promotionUuid: entity.promotionUuid,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}

export {
  type PromotionProposalEntity,
  type PromotionProposalDTO,
  promotionProposalMapper
}
