import { z } from 'zod';

export const SignUpSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Required {{ username }} property missing!' }),
    email: z
      .string({ required_error: 'Required {{ email }} property missing!' })
      .email('Property {{ email }} syntax invalid!'),
    phoneNumber: z.string({ required_error: 'Required {{ phoneNumber }} property missing!' }),
    firstName: z.string({ required_error: 'Required {{ firstName }} property missing!' }),
    lastName: z.string({ required_error: 'Required {{ lastName }} property missing!' }),
    dateBirth: z.string({ required_error: 'Required {{ dateBirth }} property missing!' })
  })
})
