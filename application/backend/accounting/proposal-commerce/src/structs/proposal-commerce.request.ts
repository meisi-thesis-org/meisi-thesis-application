import { type ProposalCommerceEntity } from './proposal-commerce.domain'

type FindProposalCommerceByUuidRequest = Readonly<Pick<ProposalCommerceEntity, 'uuid'>>
type FindProposalCommercesByForeignsUuidRequest = Partial<Readonly<Pick<ProposalCommerceEntity, 'proposalUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>>
type CreateProposalCommerceRequest = Readonly<Pick<ProposalCommerceEntity, 'proposalUuid'>> & Partial<Readonly<Pick<ProposalCommerceEntity, 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>>
type UpdateProposalCommerceByUuidRequest = Readonly<Pick<ProposalCommerceEntity, 'uuid' | 'active'>>

export type {
  FindProposalCommerceByUuidRequest,
  FindProposalCommercesByForeignsUuidRequest,
  CreateProposalCommerceRequest,
  UpdateProposalCommerceByUuidRequest
}
