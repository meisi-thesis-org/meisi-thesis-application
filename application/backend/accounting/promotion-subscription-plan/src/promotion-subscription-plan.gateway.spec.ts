import { describe, expect, it } from 'vitest';
import { PromotionSubscriptionPlanGateway } from './promotion-subscription-plan.gateway';

describe('PromotionSubscriptionPlanGateway', () => {
  const instance = new PromotionSubscriptionPlanGateway();

  it('should have an instanceOf PromotionSubscriptionPlanGateway', () => {
    expect(instance).toBeInstanceOf(PromotionSubscriptionPlanGateway)
  })
})
