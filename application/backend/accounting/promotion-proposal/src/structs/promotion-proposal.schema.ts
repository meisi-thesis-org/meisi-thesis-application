import { z } from 'zod';

const FindPromotionProposalByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindPromotionProposalsByForeignsUuidSchema = z.object({
  query: z.object({
    proposalUuid: z.string().optional(),
    promotionUuid: z.string().optional()
  })
})

const CreatePromotionProposalSchema = z.object({
  body: z.object({
    proposalUuid: z.string(),
    promotionUuid: z.string()
  })
});

const UpdatePromotionProposalByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    active: z.boolean()
  })
});

export {
  FindPromotionProposalByUuidSchema,
  FindPromotionProposalsByForeignsUuidSchema,
  CreatePromotionProposalSchema,
  UpdatePromotionProposalByUuidSchema
}
