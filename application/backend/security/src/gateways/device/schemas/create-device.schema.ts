import { z } from 'zod';

export const CreateDeviceSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    ipAddress: z.string(),
    platform: z.string(),
    model: z.string()
  })
})
