import { describe, expect, it } from 'vitest';
import { SubscriptionPlanGateway } from './subscription-plan.gateway';

describe('SubscriptionPlanGateway', () => {
  const instance = new SubscriptionPlanGateway();

  it('should have an instanceOf SubscriptionPlanGateway', () => {
    expect(instance).toBeInstanceOf(SubscriptionPlanGateway)
  })
})
