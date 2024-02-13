import { z } from 'zod'

const FindSubscriptionByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindSubscriptionByForeignsUuidSchema = z.object({
  query: z.object({
    walletUuid: z.string().optional(),
    dossierUuid: z.string().optional(),
    bookUuid: z.string().optional(),
    chapterUuid: z.string().optional(),
    pageUuid: z.string().optional()
  })
})

const CreateSubscriptionSchema = z.object({
  body: z.object({
    walletUuid: z.string(),
    dossierUuid: z.string().optional(),
    bookUuid: z.string().optional(),
    chapterUuid: z.string().optional(),
    pageUuid: z.string().optional()
  })
})

const UpdateSubscriptionByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    active: z.boolean().optional(),
    visible: z.boolean().optional()
  })
})

export {
  FindSubscriptionByUuidSchema,
  FindSubscriptionByForeignsUuidSchema,
  CreateSubscriptionSchema,
  UpdateSubscriptionByUuidSchema
}
