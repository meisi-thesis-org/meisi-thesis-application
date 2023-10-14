import { describe, expect, it } from 'vitest';
import { CampaignGateway } from './campaign.gateway';

describe('CampaignGateway', () => {
  const instance = new CampaignGateway();

  it('should have an instanceOf CampaignGateway', () => {
    expect(instance).toBeInstanceOf(CampaignGateway)
  })
})
