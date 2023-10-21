import { z } from 'zod';

const FindProposalCommerceByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindProposalCommercesByForeignsUuidSchema = z.object({
  query: z.object({
    proposalUuid: z.string().optional(),
    chapterUuid: z.string().optional(),
    bookUuid: z.string().optional(),
    dossierUuid: z.string().optional()
  })
})

const CreateProposalCommerceSchema = z.object({
  body: z.object({
    proposalUuid: z.string(),
    chapterUuid: z.string().optional(),
    bookUuid: z.string().optional(),
    dossierUuid: z.string().optional()
  })
});

const UpdateProposalCommerceByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    active: z.boolean()
  })
});

export {
  FindProposalCommerceByUuidSchema,
  FindProposalCommercesByForeignsUuidSchema,
  CreateProposalCommerceSchema,
  UpdateProposalCommerceByUuidSchema
}
