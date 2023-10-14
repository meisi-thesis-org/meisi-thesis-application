import { z } from 'zod'

const FindCampaignByUuidSchema = z.object({
  params: z.object({
    uuid: z.string()
  })
});

const CreateCampaignSchema = z.object({
  body: z.object({
    designation: z.string(),
    description: z.string()
  })
});

const UpdateCampaignByUuidSchema = z.object({
  body: z.object({
    designation: z.string().optional(),
    description: z.string().optional(),
    visible: z.boolean().optional(),
    active: z.boolean().optional()
  })
});

export {
  FindCampaignByUuidSchema,
  CreateCampaignSchema,
  UpdateCampaignByUuidSchema
}
