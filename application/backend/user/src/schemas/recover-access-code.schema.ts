import { z } from 'zod';

export const RecoverAccessCodeSchema = z.object({
  username: z.string().readonly().optional(),
  email: z.string().email().readonly().optional(),
  phoneNumber: z.string().readonly().optional()
});
