import { z } from 'zod'

const FindSubscriptionByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});

const CreateSubscriptionSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    subscriptionPlanUuid: z.string()
  })
});

const UpdateSubscriptionByUuidSchema = z.object({
  body: z.object({
    active: z.boolean().optional()
  })
});

export {
  FindSubscriptionByUuidSchema,
  CreateSubscriptionSchema,
  UpdateSubscriptionByUuidSchema
}
