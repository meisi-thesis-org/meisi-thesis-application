import { z } from 'zod'

const FindBooksByDossierUuidSchema = z.object({
  query: z.object({
    dossierUuid: z.string()
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
    description: z.string()
  })
})
const UpdateBookByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    designation: z.string(),
    description: z.string(),
    visible: z.boolean(),
    active: z.boolean()
  })
})

export {
  FindBooksByDossierUuidSchema,
  FindBookByUuidSchema,
  CreateBookSchema,
  UpdateBookByUuidSchema
}
