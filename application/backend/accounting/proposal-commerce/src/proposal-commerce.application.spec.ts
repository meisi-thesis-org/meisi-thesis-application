import { describe, expect, it } from 'vitest';
import { ProposalCommerceApplication } from './proposal-commerce.application';

describe('ProposalCommerceApplication', () => {
  const instance = new ProposalCommerceApplication();

  it('should have an instanceOf ProposalCommerceApplication', () => {
    expect(instance).toBeInstanceOf(ProposalCommerceApplication);
  })
})
