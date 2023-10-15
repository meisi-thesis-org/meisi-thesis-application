import { describe, it, expect } from 'vitest';
import { CampaignPromotionApplication } from './campaign-promotion.application';

describe('CampaignPromotionApplication', () => {
  const instance = new CampaignPromotionApplication();

  it('should have an instanceOf CampaignPromotionApplication', () => {
    expect(instance).toBeInstanceOf(CampaignPromotionApplication);
  })
})
