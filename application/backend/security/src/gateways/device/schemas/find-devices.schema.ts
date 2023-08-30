import { z } from 'zod';

export const FindDevicesSchema = z.object({
  query: z.object({
    userUuid: z.string().optional(),
    ipAddress: z.string().optional(),
    platform: z.string().optional(),
    model: z.string().optional()
  })
})
