import { z } from 'zod';

const FindDossierByUserUuidSchema = z.object({
  query: z.object({
    userUuid: z.string()
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
    designation: z.string()
  })
})

const UpdateDossierByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    designation: z.string().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
})

export {
  FindDossierByUserUuidSchema,
  FindDossierByUuidSchema,
  CreateDossierSchema,
  UpdateDossierByUuidSchema
}
