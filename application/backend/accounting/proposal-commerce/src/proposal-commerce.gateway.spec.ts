import { describe, expect, it } from 'vitest';
import { ProposalCommerceGateway } from './proposal-commerce.gateway';

describe('ProposalCommerceGateway', () => {
  const instance = new ProposalCommerceGateway();

  it('should have an instanceOf ProposalCommerceGateway', () => {
    expect(instance).toBeInstanceOf(ProposalCommerceGateway)
  })
})
