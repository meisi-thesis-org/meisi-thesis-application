import { z } from 'zod';

export const SignUpSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Required property {{ username }} is missing'
    }),
    email: z.string({
      required_error: 'Required property {{ email }} is missing'
    }).email(),
    phoneNumber: z.string({
      required_error: 'Required property {{ phoneNumber }} is missing'
    }),
    firstName: z.string({
      required_error: 'Required property {{ firstName }} is missing'
    }),
    lastName: z.string({
      required_error: 'Required property {{ lastName }} is missing'
    }),
    dateBirth: z.string({
      required_error: 'Required property {{ dateBirth }} is missing'
    })
  })
})
