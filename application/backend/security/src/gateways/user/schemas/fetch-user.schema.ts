import { z as zod } from 'zod';

export const FetchUserSchema = zod.object({
  params: zod.object({
    uuid: zod
      .string({ required_error: 'Uuid is required' })
  })
})
