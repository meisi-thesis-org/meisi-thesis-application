import { z } from 'zod';

export const FindDeviceByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})
