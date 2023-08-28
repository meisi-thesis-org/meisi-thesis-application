import { z } from 'zod';

export const UpdateActivityByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    activated: z.boolean()
  })
});
