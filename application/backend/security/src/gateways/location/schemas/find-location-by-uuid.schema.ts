import { z } from 'zod';

export const FindLocationByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})
