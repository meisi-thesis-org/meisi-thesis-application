import { z } from 'zod';

const FindSubscriptionPlanContentByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindSubscriptionPlanContentByForeignsUuidSchema = z.object({
  query: z.object({
    promotionUuid: z.string().optional(),
    chapterUuid: z.string().optional(),
    bookUuid: z.string().optional(),
    dossierUuid: z.string().optional()
  })
})

const CreateSubscriptionPlanContentSchema = z.object({
  body: z.object({
    promotionUuid: z.string(),
    chapterUuid: z.string().optional(),
    bookUuid: z.string().optional(),
    dossierUuid: z.string().optional()
  })
})

const UpdateSubscriptionPlanContentByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    active: z.boolean().optional()
  })
})

export {
  FindSubscriptionPlanContentByUuidSchema,
  FindSubscriptionPlanContentByForeignsUuidSchema,
  CreateSubscriptionPlanContentSchema,
  UpdateSubscriptionPlanContentByUuidSchema
}
