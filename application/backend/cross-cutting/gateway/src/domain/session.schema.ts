import { z } from 'zod';

const SignInSchema = z.object({
  params: z.object({
    userUuid: z.string()
  })
})

export {
  SignInSchema
}
