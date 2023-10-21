import { type ProposalCommerceEntity } from './structs/proposal-commerce.domain';

export interface ProposalCommerceRepository {
  findOneByUuid(uuid: string): Promise<ProposalCommerceEntity | undefined>
  findBulkByForeignsUuid(
    entity:
    Partial<Pick<ProposalCommerceEntity, 'proposalUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<ProposalCommerceEntity[]>
  findOneByForeignsUuid(
    entity:
    Pick<ProposalCommerceEntity, 'proposalUuid'> &
    Partial<Pick<ProposalCommerceEntity, 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<ProposalCommerceEntity | undefined>
  createOne(
    entity: ProposalCommerceEntity
  ): Promise<void>
  updateOneByUuid(
    entity: ProposalCommerceEntity
  ): Promise<void>
}
