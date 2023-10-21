import { type ProposalCommerceRepository } from '../proposal-commerce.repository';
import { type ProposalCommerceEntity } from '../structs/proposal-commerce.domain';

export class ProposalCommerceStateRepository implements ProposalCommerceRepository {
  private readonly proposalCommerces = new Array<ProposalCommerceEntity>();

  public async findOneByUuid (
    uuid: string
  ): Promise<ProposalCommerceEntity | undefined> {
    return this.proposalCommerces.find((proposalCommerce) => proposalCommerce.uuid === uuid);
  }

  public async findBulkByForeignsUuid (
    proposalCommerceEntity:
    Partial<Pick<ProposalCommerceEntity, 'proposalUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<ProposalCommerceEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async findOneByForeignsUuid (
    proposalCommerceEntity:
    Readonly<Pick<ProposalCommerceEntity, 'proposalUuid'>> &
    Partial<Readonly<Pick<ProposalCommerceEntity, 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>>
  ): Promise<ProposalCommerceEntity | undefined> {
    throw new Error('Method not implemented.');
  }

  public async createOne (
    proposalCommerceEntity: ProposalCommerceEntity
  ): Promise<void> {
    this.proposalCommerces.push(proposalCommerceEntity);
  }

  public async updateOneByUuid (
    proposalCommerceEntity: ProposalCommerceEntity
  ): Promise<void> {
    this.proposalCommerces.filter((proposalCommerce) => {
      if (proposalCommerce.uuid === proposalCommerceEntity.uuid) {
        proposalCommerce = { ...proposalCommerce, ...proposalCommerceEntity }
      }

      return proposalCommerce;
    })
  }
}
