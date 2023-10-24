import { z } from 'zod';

const FindWalletByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindWalletByUserUuidSchema = z.object({
  qery: z.object({
    userUuid: z.string()
  })
})

const CreateWalletSchema = z.object({
  body: z.object({
    userUuid: z.string()
  })
})

const UpdateWalletByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    funds: z.number(),
    active: z.boolean(),
    enabled: z.boolean()
  })
})

export { FindWalletByUuidSchema, FindWalletByUserUuidSchema, CreateWalletSchema, UpdateWalletByUuidSchema }
