import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { proposalCommerceMapper, type ProposalCommerceDTO, type ProposalCommerceEntity } from './structs/proposal-commerce.domain';
import { type FindProposalCommercesByForeignsUuidRequest, type FindProposalCommerceByUuidRequest, type CreateProposalCommerceRequest, type UpdateProposalCommerceByUuidRequest } from './structs/proposal-commerce.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type ProposalCommerceRepository } from './proposal-commerce.repository';
import { ProposalCommerceStateRepository } from './repositories/proposal-commerce-state.repository';

export class ProposalCommerceService {
  private readonly repository: ProposalCommerceRepository = new ProposalCommerceStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findOneByUuid (
    { uuid }: FindProposalCommerceByUuidRequest
  ): Promise<ProposalCommerceDTO> {
    const foundProposalCommerce = await this.repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundProposalCommerce === undefined) throw new NonFoundException();

    return proposalCommerceMapper(foundProposalCommerce);
  }

  public async findBulkByForeignsUuid (
    { proposalUuid, chapterUuid, bookUuid, dossierUuid }: FindProposalCommercesByForeignsUuidRequest
  ): Promise<ProposalCommerceEntity[]> {
    const foundProposalCommerces = await this.repository
      .findBulkByForeignsUuid({ proposalUuid, chapterUuid, bookUuid, dossierUuid })
      .catch(() => {
        throw new InternalServerException()
      })

    return foundProposalCommerces.map((foundProposalCommerce) => proposalCommerceMapper(foundProposalCommerce));
  }

  public async createOne (
    { proposalUuid, chapterUuid, bookUuid, dossierUuid }: CreateProposalCommerceRequest
  ): Promise<ProposalCommerceEntity> {
    const foundProposalCommerce = await this.repository
      .findOneByForeignsUuid({ proposalUuid, chapterUuid, bookUuid, dossierUuid })
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundProposalCommerce !== undefined) throw new ConflictException();

    const createdProposalCommerce: ProposalCommerceEntity = {
      uuid: this.randomProvider.randomUUID(),
      proposalUuid,
      chapterUuid,
      bookUuid,
      dossierUuid,
      active: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .createOne(createdProposalCommerce)
      .catch(() => { throw new InternalServerException() })

    return proposalCommerceMapper(createdProposalCommerce);
  }

  public async updateOneByUuid (
    { uuid, active }: UpdateProposalCommerceByUuidRequest
  ): Promise<ProposalCommerceEntity> {
    const foundProposalCommerce = await this.repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      })

    if (foundProposalCommerce === undefined) throw new NonFoundException();

    const updateProposalCommerce: ProposalCommerceEntity = {
      uuid: foundProposalCommerce.uuid,
      proposalUuid: foundProposalCommerce.proposalUuid,
      chapterUuid: foundProposalCommerce.chapterUuid,
      bookUuid: foundProposalCommerce.bookUuid,
      dossierUuid: foundProposalCommerce.dossierUuid,
      active,
      createdAt: foundProposalCommerce.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(updateProposalCommerce)
      .catch(() => { throw new InternalServerException() })

    return proposalCommerceMapper(updateProposalCommerce);
  }
}
