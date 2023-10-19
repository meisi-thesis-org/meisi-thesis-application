type ProposalEntity = {
  readonly uuid: string
  designation: string
  description: string
  price: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type ProposalDTO = Readonly<ProposalEntity>;
const proposalMapper = (
  entity: ProposalEntity
): ProposalDTO => {
  return {
    uuid: entity.uuid,
    designation: entity.designation,
    description: entity.description,
    price: entity.price,
    visible: entity.visible,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
};

export {
  type ProposalEntity,
  type ProposalDTO,
  proposalMapper
}
