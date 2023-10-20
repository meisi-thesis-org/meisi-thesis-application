import { z } from 'zod';

const FindCampaignPromotionByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
})

const FindCampaignPromotionsByForeignsUuidSchema = z.object({
  query: z.object({
    campaignUuid: z.string().optional(),
    promotionUuid: z.string().optional()
  })
})

const CreateCampaignPromotionSchema = z.object({
  body: z.object({
    campaignUuid: z.string(),
    promotionUuid: z.string()
  })
});

const UpdateCampaignPromotionByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  }),
  body: z.object({
    active: z.boolean()
  })
});

export {
  FindCampaignPromotionByUuidSchema,
  FindCampaignPromotionsByForeignsUuidSchema,
  CreateCampaignPromotionSchema,
  UpdateCampaignPromotionByUuidSchema
}
