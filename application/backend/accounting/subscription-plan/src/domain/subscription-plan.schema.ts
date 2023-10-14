import { z } from 'zod';

const FindSubscriptionPlanByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const CreateSubscriptionPlanSchema = z.object({
  body: z.object({
    designation: z.string(),
    description: z.string(),
    price: z.number()
  })
});

const UpdateSubscriptionPlanByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    designation: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
});

export {
  FindSubscriptionPlanByUuidSchema,
  CreateSubscriptionPlanSchema,
  UpdateSubscriptionPlanByUuidSchema
}
