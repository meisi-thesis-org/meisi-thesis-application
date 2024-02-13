import { z } from 'zod';

const FindWalletByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindWalletByUserUuidSchema = z.object({
  query: z.object({
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
    funds: z.number().optional(),
    active: z.boolean().optional(),
    visible: z.boolean().optional()
  })
})

export { FindWalletByUuidSchema, FindWalletByUserUuidSchema, CreateWalletSchema, UpdateWalletByUuidSchema }
