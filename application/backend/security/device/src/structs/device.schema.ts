import { z } from 'zod';

const FindDeviceByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});

const FindDevicesByUserUuidSchema = z.object({
  query: z.object({
    userUuid: z.string()
  })
});

const CreateDeviceSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    ipAddress: z.string()
  })
})

const UpdateDeviceByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    ipAddress: z.string().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
})

export {
  FindDeviceByUuidSchema,
  FindDevicesByUserUuidSchema,
  CreateDeviceSchema,
  UpdateDeviceByUuidSchema
}
