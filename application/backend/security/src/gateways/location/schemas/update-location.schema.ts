import { z } from 'zod';

export const UpdateLocationSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    userUuid: z.string(),
    coordinateX: z.string(),
    coordinateY: z.string()
  })
})
