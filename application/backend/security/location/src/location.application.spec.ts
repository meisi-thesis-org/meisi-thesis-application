import { describe, it, expect } from 'vitest';
import { LocationApplication } from './location.application';

describe('LocationApplication', () => {
  const instance = new LocationApplication();

  it('should have an instanceOf LocationApplication', () => {
    expect(instance).toBeInstanceOf(LocationApplication);
  })
})
