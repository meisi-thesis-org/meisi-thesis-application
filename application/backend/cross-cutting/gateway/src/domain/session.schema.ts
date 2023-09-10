import { z } from 'zod';

const SignInSchema = z.object({
  body: z.object({
    userUuid: z.string()
  })
})

export {
  SignInSchema
}
