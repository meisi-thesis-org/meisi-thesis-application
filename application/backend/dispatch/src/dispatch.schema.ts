import { z } from 'zod';

const dispatchSchema = z.object({
  correlationUuid: z.string(),
  severity: z.enum(['Error', 'Warning', 'Info']),
  url: z.string(),
  toEmail: z.string(),
  subject: z.string(),
  content: z.string()
});

export {
  dispatchSchema
}
