import { z } from 'zod';

const FindProposalByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const CreateProposalSchema = z.object({
  body: z.object({
    designation: z.string(),
    description: z.string(),
    price: z.number()
  })
});

const UpdateProposalByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    designation: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
});

export {
  FindProposalByUuidSchema,
  CreateProposalSchema,
  UpdateProposalByUuidSchema
}
