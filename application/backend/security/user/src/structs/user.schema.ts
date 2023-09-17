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
    dateBirth: z.string().transform((value) => new Date(value).toISOString())
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
    dateBirth: z.string().transform((value) => new Date(value).toISOString()).optional()
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
