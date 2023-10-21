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
    entity:
    Partial<Pick<ProposalCommerceEntity, 'proposalUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<ProposalCommerceEntity[]> {
    /** Find By Proposal Uuid */
    const foundByProposalUuid = this.proposalCommerces.filter(({ proposalUuid }) => proposalUuid === entity.proposalUuid)
    const sanitizedFoundByProposalUuidResults = foundByProposalUuid.length > 0 ? foundByProposalUuid : this.proposalCommerces;

    /** Find By Chapter Uuid */
    const foundByChapterUuid = sanitizedFoundByProposalUuidResults.filter(({ chapterUuid }) => chapterUuid === entity.chapterUuid)
    const sanitizedFoundByChapterUuid = foundByChapterUuid.length > 0 ? foundByChapterUuid : sanitizedFoundByProposalUuidResults;

    /** Find By Book Uuid */
    const foundByBookUuid = sanitizedFoundByChapterUuid.filter(({ bookUuid }) => bookUuid === entity.bookUuid)
    const sanitizedFoundByBookUuid = foundByBookUuid.length > 0 ? foundByBookUuid : sanitizedFoundByChapterUuid;

    /** Find By Dossier Uuid */
    const foundByDossierUuid = sanitizedFoundByBookUuid.filter(({ dossierUuid }) => dossierUuid === entity.dossierUuid)
    return foundByDossierUuid.length > 0 ? foundByDossierUuid : sanitizedFoundByBookUuid;
  }

  public async findOneByForeignsUuid (
    entity:
    Readonly<Pick<ProposalCommerceEntity, 'proposalUuid'>> &
    Partial<Readonly<Pick<ProposalCommerceEntity, 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>>
  ): Promise<ProposalCommerceEntity | undefined> {
    /** Find By Proposal Uuid */
    return this.proposalCommerces.find((proposalCommerce) => {
      if (proposalCommerce.proposalUuid === entity.proposalUuid &&
        (
          proposalCommerce.chapterUuid === entity.chapterUuid ||
          proposalCommerce.bookUuid === entity.bookUuid ||
          proposalCommerce.dossierUuid === entity.dossierUuid
        )
      ) {
        return proposalCommerce;
      }

      return undefined;
    })
  }

  public async createOne (
    entity: ProposalCommerceEntity
  ): Promise<void> {
    this.proposalCommerces.push(entity);
  }

  public async updateOneByUuid (
    entity: ProposalCommerceEntity
  ): Promise<void> {
    this.proposalCommerces.filter((proposalCommerce) => {
      if (proposalCommerce.uuid === entity.uuid) {
        proposalCommerce = { ...proposalCommerce, ...entity }
      }

      return proposalCommerce;
    })
  }
}
