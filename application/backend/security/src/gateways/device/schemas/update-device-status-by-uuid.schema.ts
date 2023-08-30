import { z } from 'zod';

export const UpdateDeviceStatusByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    enabled: z.boolean()
  })
})
