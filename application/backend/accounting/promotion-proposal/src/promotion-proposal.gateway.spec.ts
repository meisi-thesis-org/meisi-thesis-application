import { describe, expect, it } from 'vitest';
import { PromotionProposalGateway } from './promotion-proposal.gateway';

describe('PromotionProposalGateway', () => {
  const instance = new PromotionProposalGateway();

  it('should have an instanceOf PromotionProposalGateway', () => {
    expect(instance).toBeInstanceOf(PromotionProposalGateway)
  })
})
