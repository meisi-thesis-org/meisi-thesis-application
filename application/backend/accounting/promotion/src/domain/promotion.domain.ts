type PromotionEntity = {
  readonly uuid: string
  designation: string
  description: string
  priceReduction: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type PromotionDTO = Readonly<PromotionEntity>;
const promotionMapper = (entity: PromotionEntity): PromotionDTO => {
  return {
    uuid: entity.uuid,
    designation: entity.designation,
    description: entity.description,
    priceReduction: entity.priceReduction,
    visible: entity.visible,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
};

export {
  type PromotionEntity,
  type PromotionDTO,
  promotionMapper
}
