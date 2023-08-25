import { z } from 'zod';

export const CreateLocationSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    coordinateX: z.string(),
    coordinateY: z.string()
  })
})
