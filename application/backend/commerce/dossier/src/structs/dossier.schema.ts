import { z } from 'zod';

const FindDossierByQuerySchema = z.object({
  query: z.object({
    userUuid: z.string().optional()
  })
})

const FindDossierByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const CreateDossierSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    designation: z.string(),
    price: z.number()
  })
})

const UpdateDossierByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    designation: z.string().optional(),
    price: z.number().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
})

export {
  FindDossierByQuerySchema,
  FindDossierByUuidSchema,
  CreateDossierSchema,
  UpdateDossierByUuidSchema
}
