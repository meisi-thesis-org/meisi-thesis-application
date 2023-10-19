import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type ProposalRepository } from './proposal.repository';
import { ProposalStateRepository } from './repositories/proposal-state.repository';
import { proposalMapper, type ProposalDTO, type ProposalEntity } from './structs/proposal.domain';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type UpdateProposalByUuidRequest, type CreateProposalRequest, type FindProposalByUuidRequest } from './structs/proposal.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';

export class ProposalService {
  private readonly repository: ProposalRepository = new ProposalStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findBulk (): Promise<ProposalDTO[]> {
    const foundProposals = await this.repository
      .findBulk()
      .catch(() => { throw new InternalServerException() });

    const subscritionPlansDTOs = new Array<ProposalDTO>();

    for (const foundProposal of foundProposals) {
      subscritionPlansDTOs.push(proposalMapper(foundProposal));
    }

    return subscritionPlansDTOs;
  }

  public async findOneByUuid ({ uuid }: FindProposalByUuidRequest): Promise<ProposalDTO> {
    const foundProposal = await this.repository
      .findOneByUuid(uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundProposal === undefined) throw new NonFoundException();

    return proposalMapper(foundProposal);
  }

  public async createOne (args: CreateProposalRequest): Promise<ProposalDTO> {
    const foundProposal = await this.repository
      .findOneByDesignation(args.designation)
      .catch(() => { throw new InternalServerException() });

    if (foundProposal !== undefined) throw new ConflictException();

    const createdProposal: ProposalEntity = {
      uuid: this.randomProvider.randomUUID(),
      designation: args.designation,
      description: args.description,
      price: args.price,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toString()
    }

    await this.repository
      .createOne(createdProposal)
      .catch(() => { throw new InternalServerException() });

    return proposalMapper(createdProposal);
  }

  public async updateOneByUuid (args: UpdateProposalByUuidRequest): Promise<ProposalDTO> {
    const foundProposal = await this.repository
      .findOneByUuid(args.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundProposal === undefined) throw new NonFoundException();

    const updateProposal: ProposalEntity = {
      uuid: foundProposal.uuid,
      designation: args.designation ?? foundProposal.designation,
      description: args.description ?? foundProposal.description,
      price: args.price ?? foundProposal.price,
      visible: args.visible ?? foundProposal.visible,
      active: args.active ?? foundProposal.active,
      createdAt: foundProposal.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    }

    await this.repository
      .updateOneByUuid(foundProposal)
      .catch(() => { throw new InternalServerException() });

    return proposalMapper(updateProposal);
  }
}
