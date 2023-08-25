import { z } from 'zod';

export const SignOutSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});
