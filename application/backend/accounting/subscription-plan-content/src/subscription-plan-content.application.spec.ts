import { describe, it, expect } from 'vitest';
import { SubscriptionPlanContentApplication } from './subscription-plan-content.application';

describe('SubscriptionPlanContentApplication', () => {
  const instance = new SubscriptionPlanContentApplication();

  it('should have an instanceOf SubscriptionPlanContentApplication', () => {
    expect(instance).toBeInstanceOf(SubscriptionPlanContentApplication);
  })
})
