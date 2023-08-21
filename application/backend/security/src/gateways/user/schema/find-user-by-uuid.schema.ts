import { z } from 'zod';

export const findUserByUuidSchema = z.object({
  uuid: z.string()
});
