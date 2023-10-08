import { z } from 'zod';

const FindNetworkByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});

const FindNetworksByUserUuidSchema = z.object({
  query: z.object({
    userUuid: z.string()
  })
});

const CreateNetworkSchema = z.object({
  body: z.object({
    userUuid: z.string(),
    coordinateX: z.string(),
    coordinateY: z.string()
  })
})

const UpdateNetworkByUuidSchema = z.object({
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
  FindNetworkByUuidSchema,
  FindNetworksByUserUuidSchema,
  CreateNetworkSchema,
  UpdateNetworkByUuidSchema
}
