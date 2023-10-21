import { type ProposalCommerceEntity } from './structs/proposal-commerce.domain';

export interface ProposalCommerceRepository {
  findOneByUuid(uuid: string): Promise<ProposalCommerceEntity | undefined>
  findBulkByForeignsUuid(
    proposalCommerceEntity:
    Partial<Pick<ProposalCommerceEntity, 'proposalUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<ProposalCommerceEntity[]>
  findOneByForeignsUuid(
    proposalCommerceEntity:
    Pick<ProposalCommerceEntity, 'proposalUuid'> &
    Partial<Pick<ProposalCommerceEntity, 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<ProposalCommerceEntity | undefined>
  createOne(
    proposalCommerceEntity: ProposalCommerceEntity
  ): Promise<void>
  updateOneByUuid(
    proposalCommerceEntity: ProposalCommerceEntity
  ): Promise<void>
}
