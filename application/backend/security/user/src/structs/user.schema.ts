import { z } from 'zod';

const FindUserByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindUserByAccessCodeSchema = z.object({
  params: z.object({
    accessCode: z.string()
  })
})

const CreateUserSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    name: z.string(),
    dateBirth: z.date()
  })
})

const UpdateUserByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    name: z.string().optional(),
    dateBirth: z.string().optional()
  })
})

const UpdateUserAccessCodeSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional()
  })
})

export {
  FindUserByUuidSchema,
  FindUserByAccessCodeSchema,
  CreateUserSchema,
  UpdateUserByUuidSchema,
  UpdateUserAccessCodeSchema
}
