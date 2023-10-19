import { type ProposalEntity } from './structs/proposal.domain'

export interface ProposalRepository {
  findBulk(
  ): Promise<ProposalEntity[]>
  findOneByUuid(
    uuid: string
  ): Promise<ProposalEntity | undefined>
  findOneByDesignation(
    designation: string
  ): Promise<ProposalEntity | undefined>
  createOne(
    proposalEntity: ProposalEntity
  ): Promise<void>
  updateOneByUuid(
    proposalEntity: Omit<ProposalEntity, 'createdAt'>
  ): Promise<void>
}
