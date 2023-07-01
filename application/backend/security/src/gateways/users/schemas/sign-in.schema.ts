import { z } from 'zod';

export const SignInSchema = z.object({
  body: z.object({
    accessCode: z.string({ required_error: 'Required {{ accessCode }} property missing!' })
  })
})
