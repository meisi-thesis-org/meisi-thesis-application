import { describe, it, expect } from 'vitest';
import { PromotionApplication } from './promotion.application';

describe('PromotionApplication', () => {
  const instance = new PromotionApplication();

  it('should have an instanceOf PromotionApplication', () => {
    expect(instance).toBeInstanceOf(PromotionApplication);
  })
})
