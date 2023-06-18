import { z as zod } from 'zod';

export const RefreshAccessCodeSchema = zod.object({
  body: zod.object({
    email: zod
      .string({ required_error: 'Email is required' })
      .email('Invalid Syntax'),
    username: zod
      .string({ required_error: 'Username is required' }),
    phoneNumber: zod
      .string({ required_error: 'PhoneNumber is required' })
  })
})
