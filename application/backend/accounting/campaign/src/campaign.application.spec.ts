import { describe, it, expect } from 'vitest';
import { CampaignApplication } from './campaign.application';

describe('CampaignApplication', () => {
  const instance = new CampaignApplication();

  it('should have an instanceOf CampaignApplication', () => {
    expect(instance).toBeInstanceOf(CampaignApplication);
  })
})
