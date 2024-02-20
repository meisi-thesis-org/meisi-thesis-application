import { z } from 'zod'

const FindBooksByQuerySchema = z.object({
  query: z.object({
    dossierUuid: z.string().optional()
  })
})
const FindBookByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})
const CreateBookSchema = z.object({
  body: z.object({
    dossierUuid: z.string(),
    designation: z.string(),
    description: z.string(),
    price: z.number()
  })
})
const UpdateBookByUuidSchema = z.object({
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
})

export {
  FindBooksByQuerySchema,
  FindBookByUuidSchema,
  CreateBookSchema,
  UpdateBookByUuidSchema
}
