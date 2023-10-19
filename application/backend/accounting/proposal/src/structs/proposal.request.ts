import { type ProposalEntity } from './proposal.domain';

type FindProposalByUuidRequest =
    Readonly<Pick<ProposalEntity, 'uuid'>>;
type CreateProposalRequest =
    Readonly<Pick<ProposalEntity, 'designation' | 'description' | 'price'>>;
type UpdateProposalByUuidRequest =
    Readonly<Pick<ProposalEntity, 'uuid'>> &
    Partial<Readonly<Omit<ProposalEntity, 'createdAt' | 'updatedAt'>>>;

export type {
  FindProposalByUuidRequest,
  CreateProposalRequest,
  UpdateProposalByUuidRequest
}
