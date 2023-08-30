import { z } from 'zod';

export const UpdateDeviceByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    ipAddress: z.string(),
    platform: z.string(),
    model: z.string()
  })
})
