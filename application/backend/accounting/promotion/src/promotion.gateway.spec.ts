import { describe, expect, it } from 'vitest';
import { PromotionGateway } from './promotion.gateway';

describe('PromotionGateway', () => {
  const instance = new PromotionGateway();

  it('should have an instanceOf PromotionGateway', () => {
    expect(instance).toBeInstanceOf(PromotionGateway)
  })
})
