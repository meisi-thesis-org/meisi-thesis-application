import { z } from 'zod';

const FindPageByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindPageByChapterUuidSchema = z.object({
  query: z.object({
    chapterUuid: z.string()
  })
})

const CreatePageSchema = z.object({
  body: z.object({
    chapterUuid: z.string(),
    description: z.string()
  })
})

const UpdatePageByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    description: z.string().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
})

export { FindPageByUuidSchema, FindPageByChapterUuidSchema, CreatePageSchema, UpdatePageByUuidSchema };
