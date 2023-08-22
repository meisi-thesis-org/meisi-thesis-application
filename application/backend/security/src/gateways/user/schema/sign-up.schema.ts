import { z } from 'zod';

export const SignUpSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string()
  })
})
