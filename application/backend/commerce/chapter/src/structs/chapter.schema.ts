import { z } from 'zod'

const FindChaptersByBookUuidSchema = z.object({
  query: z.object({
    bookUuid: z.string()
  })
})
const FindChapterByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})
const CreateChapterSchema = z.object({
  body: z.object({
    bookUuid: z.string(),
    designation: z.string(),
    description: z.string(),
    price: z.number()
  })
})
const UpdateChapterByUuidSchema = z.object({
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
  FindChaptersByBookUuidSchema,
  FindChapterByUuidSchema,
  CreateChapterSchema,
  UpdateChapterByUuidSchema
}
