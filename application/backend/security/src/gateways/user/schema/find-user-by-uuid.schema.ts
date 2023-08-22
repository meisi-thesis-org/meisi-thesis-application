import { z } from 'zod';

export const findUserByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});
