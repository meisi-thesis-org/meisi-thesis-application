import { type ProposalRepository } from '../proposal.repository';
import { type ProposalEntity } from '../structs/proposal.domain';

export class ProposalStateRepository implements ProposalRepository {
  private readonly proposals: ProposalEntity[] = [];

  public async findBulk (): Promise<ProposalEntity[]> {
    return this.proposals;
  }

  public async findOneByUuid (
    uuid: string
  ): Promise<ProposalEntity | undefined> {
    return this.proposals.find((proposal) => proposal.uuid === uuid);
  }

  public async findOneByDesignation (
    designation: string
  ): Promise<ProposalEntity | undefined> {
    return this.proposals.find((proposal) => proposal.designation === designation);
  }

  public async createOne (
    proposalEntity: ProposalEntity
  ): Promise<void> {
    this.proposals.push(proposalEntity);
  }

  public async updateOneByUuid (
    proposalEntity: Omit<ProposalEntity, 'createdAt'>
  ): Promise<void> {
    this.proposals.find((proposal) => {
      if (proposal.uuid === proposalEntity.uuid) {
        proposal = { ...proposal, ...proposalEntity }
      }

      return proposal;
    });
  }
}
