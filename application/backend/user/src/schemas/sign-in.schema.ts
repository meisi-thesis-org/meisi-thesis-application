import { z } from 'zod';

export const SignInSchema = z.object({
  accessCode: z.string().length(12).readonly()
});
