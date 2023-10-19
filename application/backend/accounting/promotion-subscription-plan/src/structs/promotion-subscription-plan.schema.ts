import { z } from 'zod';

const FindPromotionSubscriptionPlanByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindPromotionSubscriptionPlansByForeignsUuidSchema = z.object({
  query: z.object({
    promotionUuid: z.string().optional(),
    subscriptionPlanUuid: z.string().optional()
  })
})

const CreatePromotionSubscriptionPlanSchema = z.object({
  body: z.object({
    promotionUuid: z.string(),
    subscriptionPlanUuid: z.string()
  })
})

const UpdatePromotionSubscriptionPlanByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    active: z.boolean().optional()
  })
})

export {
  FindPromotionSubscriptionPlanByUuidSchema,
  FindPromotionSubscriptionPlansByForeignsUuidSchema,
  CreatePromotionSubscriptionPlanSchema,
  UpdatePromotionSubscriptionPlanByUuidSchema
}
