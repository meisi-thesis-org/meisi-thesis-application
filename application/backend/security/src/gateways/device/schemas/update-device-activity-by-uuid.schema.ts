import { z } from 'zod';

export const UpdateDeviceActivityByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    activated: z.boolean()
  })
})
