import { z } from 'zod';

export const FindLocationsSchema = z.object({
  query: z.object({
    userUuid: z.string().optional(),
    coordinateX: z.string().optional(),
    coordinateY: z.string().optional()
  })
})
