import { describe, expect, it } from 'vitest';
import { PromotionSubscriptionPlanGateway } from './subscription-plan-content.gateway';

describe('PromotionSubscriptionPlanGateway', () => {
  const instance = new PromotionSubscriptionPlanGateway();

  it('should have an instanceOf PromotionSubscriptionPlanGateway', () => {
    expect(instance).toBeInstanceOf(PromotionSubscriptionPlanGateway)
  })
})
