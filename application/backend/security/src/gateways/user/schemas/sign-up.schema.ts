import { z as zod } from 'zod';

export const SignUpSchema = zod.object({
  body: zod.object({
    email: zod
      .string({ required_error: 'Email is required' })
      .email('Invalid Syntax'),
    username: zod
      .string({ required_error: 'Username is required' }),
    phoneNumber: zod
      .string({ required_error: 'PhoneNumber is required' }),
    firstName: zod
      .string({ required_error: 'FirstName is required' }),
    lastName: zod
      .string({ required_error: 'LastName is required' }),
    dateBirth: zod
      .string({ required_error: 'DateBirth is required' })
  })
})
