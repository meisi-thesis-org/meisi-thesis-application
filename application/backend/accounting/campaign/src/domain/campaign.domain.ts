type CampaignEntity = {
  readonly uuid: string
  designation: string
  description: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type CampaignDTO = Readonly<CampaignEntity>;
const campaignMapper = (entity: CampaignEntity): CampaignDTO => {
  return {
    uuid: entity.uuid,
    designation: entity.designation,
    description: entity.description,
    visible: entity.visible,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
};

export {
  type CampaignEntity,
  type CampaignDTO,
  campaignMapper
}
