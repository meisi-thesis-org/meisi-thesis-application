import { z } from 'zod';

export const RefreshTokensSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});
