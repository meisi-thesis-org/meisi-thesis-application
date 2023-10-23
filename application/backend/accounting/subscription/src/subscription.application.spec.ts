import { describe, it, expect } from 'vitest';
import { SubscriptionApplication } from './subscription.application';

describe('SubscriptionApplication', () => {
  const instance = new SubscriptionApplication();

  it('should have an instanceOf SubscriptionApplication', () => {
    expect(instance).toBeInstanceOf(SubscriptionApplication);
  })
})
