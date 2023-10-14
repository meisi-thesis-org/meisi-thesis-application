import { describe, it, expect } from 'vitest';
import { SubscriptionPlanApplication } from './subscription-plan.application';

describe('SubscriptionPlanApplication', () => {
  const instance = new SubscriptionPlanApplication();

  it('should have an instanceOf SubscriptionPlanApplication', () => {
    expect(instance).toBeInstanceOf(SubscriptionPlanApplication);
  })
})
