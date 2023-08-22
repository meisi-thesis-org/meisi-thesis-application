import { z } from 'zod';

export const FindUserByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});
