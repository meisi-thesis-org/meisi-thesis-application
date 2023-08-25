import { describe, expect, it } from 'vitest';
import { LocationController } from './location.controller';

describe('LocationController', () => {
  const instance = new LocationController();

  it('should have an instanceOf LocationController', () => {
    expect(instance).toBeInstanceOf(LocationController);
  })
})
