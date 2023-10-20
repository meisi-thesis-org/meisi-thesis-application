import { describe, expect, it } from 'vitest';
import { PromotionProposalApplication } from './promotion-proposals.application';

describe('PromotionProposalApplication', () => {
  const instance = new PromotionProposalApplication();

  it('should have an instanceOf PromotionProposalApplication', () => {
    expect(instance).toBeInstanceOf(PromotionProposalApplication);
  })
})
