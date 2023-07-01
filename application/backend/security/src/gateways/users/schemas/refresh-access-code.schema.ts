import { z } from 'zod';

export const RefreshAccessCodeSchema = z.object({
  body: z.object({
    username: z.string().nullable(),
    email: z.string().email().nullable(),
    phoneNumber: z.string().nullable()
  })
})
