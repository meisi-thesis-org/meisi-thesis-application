import { describe, expect, it } from 'vitest';
import { SubscriptionGateway } from './subscription.gateway';

describe('SubscriptionGateway', () => {
  const instance = new SubscriptionGateway();

  it('should have an instanceOf SubscriptionGateway', () => {
    expect(instance).toBeInstanceOf(SubscriptionGateway)
  })
})
