import { z } from 'zod';

export const SignUpSchema = z.object({
  username: z.string().readonly(),
  email: z.string().email().readonly(),
  phoneNumber: z.string().readonly()
});
