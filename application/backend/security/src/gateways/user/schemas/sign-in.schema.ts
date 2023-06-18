import { z as zod } from 'zod';

export const SignInSchema = zod.object({
  body: zod.object({
    accessCode: zod
      .string({ required_error: 'AccessCode is required' })
  })
})
