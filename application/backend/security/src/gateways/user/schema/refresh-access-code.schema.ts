import { z } from 'zod';

export const RefreshAccessCodeSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional()
  })
})
