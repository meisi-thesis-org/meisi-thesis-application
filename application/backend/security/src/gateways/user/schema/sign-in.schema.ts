import { z } from 'zod';

export const signInSchema = z.object({
  body: z.object({
    accessCode: z.string()
  })
});
