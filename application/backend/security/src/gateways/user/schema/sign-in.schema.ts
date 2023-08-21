import { z } from 'zod';

export const signInSchema = z.object({
  accessCode: z.string()
});
