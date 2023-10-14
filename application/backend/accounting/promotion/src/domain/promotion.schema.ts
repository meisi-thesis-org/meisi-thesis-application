import { z } from 'zod'

const FindPromotionByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});

const CreatePromotionSchema = z.object({
  body: z.object({
    designation: z.string(),
    description: z.string(),
    priceReduction: z.number()
  })
});

const UpdatePromotionByUuidSchema = z.object({
  body: z.object({
    designation: z.string().optional(),
    description: z.string().optional(),
    priceReduction: z.number().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
});

export {
  FindPromotionByUuidSchema,
  CreatePromotionSchema,
  UpdatePromotionByUuidSchema
}
