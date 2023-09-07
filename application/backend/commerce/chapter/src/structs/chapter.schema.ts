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
    description: z.string()
  })
})
const UpdateChapterByUuidSchema = z.object({
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
  FindChaptersByBookUuidSchema,
  FindChapterByUuidSchema,
  CreateChapterSchema,
  UpdateChapterByUuidSchema
}
