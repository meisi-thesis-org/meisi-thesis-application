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
    designation: z.string(),
    description: z.string(),
    price: z.number()
  })
})

const UpdatePageByUuidSchema = z.object({
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

export { FindPageByUuidSchema, FindPageByChapterUuidSchema, CreatePageSchema, UpdatePageByUuidSchema };
