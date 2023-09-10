import { z } from 'zod';

export const DispatcherSchema = z.object({
  routeURL: z.string(),
  correlationUuid: z.string(),
  toEmail: z.string().email(),
  subject: z.string(),
  content: z.string()
});
