import { describe, expect, it } from 'vitest';
import { ProposalGateway } from './proposal.gateway';

describe('ProposalGateway', () => {
  const instance = new ProposalGateway();

  it('should have an instanceOf ProposalGateway', () => {
    expect(instance).toBeInstanceOf(ProposalGateway)
  })
})
