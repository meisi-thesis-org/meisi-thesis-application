import { z } from 'zod';

export const UpdateCoordinatesByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    coordinatesX: z.string(),
    coordinatesY: z.string()
  })
});
