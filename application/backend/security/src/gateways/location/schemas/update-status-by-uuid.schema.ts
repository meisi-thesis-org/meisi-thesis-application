import { z } from 'zod';

export const UpdateStatusByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    enabled: z.boolean()
  })
});
