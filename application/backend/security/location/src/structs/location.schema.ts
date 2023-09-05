import { z } from 'zod';

const FindLocationByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});

const FindLocationsByUserUuidSchema = z.object({
  query: z.object({
    userUuid: z.string()
  })
});

const CreateLocationSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    coordinateX: z.string(),
    coordinateY: z.string()
  })
})

const UpdateLocationByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    coordinateX: z.string().optional(),
    coordinateY: z.string().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
})

export {
  FindLocationByUuidSchema,
  FindLocationsByUserUuidSchema,
  CreateLocationSchema,
  UpdateLocationByUuidSchema
}
