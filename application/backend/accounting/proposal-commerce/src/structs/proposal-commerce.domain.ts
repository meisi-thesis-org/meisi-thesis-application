type ProposalCommerceEntity = {
  readonly uuid: string
  proposalUuid: string
  chapterUuid: string | undefined
  bookUuid: string | undefined
  dossierUuid: string | undefined
  active: boolean
  readonly createdAt: string
  updatedAt: string
}
type ProposalCommerceDTO = Readonly<ProposalCommerceEntity>
const proposalCommerceMapper = (entity: ProposalCommerceEntity): ProposalCommerceDTO => {
  return {
    uuid: entity.uuid,
    proposalUuid: entity.proposalUuid,
    chapterUuid: entity.chapterUuid,
    bookUuid: entity.bookUuid,
    dossierUuid: entity.dossierUuid,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}

export {
  type ProposalCommerceEntity,
  type ProposalCommerceDTO,
  proposalCommerceMapper
}
