import { describe, it, expect } from 'vitest';
import { ProposalApplication } from './proposal.application';

describe('ProposalApplication', () => {
  const instance = new ProposalApplication();

  it('should have an instanceOf ProposalApplication', () => {
    expect(instance).toBeInstanceOf(ProposalApplication);
  })
})
