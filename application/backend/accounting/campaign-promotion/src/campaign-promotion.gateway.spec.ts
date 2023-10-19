import { describe, expect, it } from 'vitest';
import { CampaignPromotionGateway } from './campaign-promotion.gateway';

describe('CampaignPromotionGateway', () => {
  const instance = new CampaignPromotionGateway();

  it('should have an instanceOf CampaignPromotionGateway', () => {
    expect(instance).toBeInstanceOf(CampaignPromotionGateway)
  })
})
