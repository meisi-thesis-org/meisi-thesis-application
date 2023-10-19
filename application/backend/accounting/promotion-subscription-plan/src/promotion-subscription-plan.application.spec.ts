import { describe, it, expect } from 'vitest';
import { PromotionSubscriptionPlanApplication } from './promotion-subscription-plan.application';

describe('PromotionSubscriptionPlanApplication', () => {
  const instance = new PromotionSubscriptionPlanApplication();

  it('should have an instanceOf PromotionSubscriptionPlanApplication', () => {
    expect(instance).toBeInstanceOf(PromotionSubscriptionPlanApplication);
  })
})
