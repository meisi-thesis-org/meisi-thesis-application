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
    latitude: z.number(),
    longitude: z.number()
  })
})

const UpdateNetworkByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    latitude: z.string().optional(),
    longitude: z.string().optional(),
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
