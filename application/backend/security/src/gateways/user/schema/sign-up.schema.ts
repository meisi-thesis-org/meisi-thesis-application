import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  phoneNumber: z.string()
})
