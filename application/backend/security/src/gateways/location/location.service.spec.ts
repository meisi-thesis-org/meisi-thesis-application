import { describe, expect, it } from 'vitest';
import { LocationService } from './location.service';

describe('LocationService', () => {
  const instance = new LocationService();

  it('should have an instanceOf LocationService', () => {
    expect(instance).toBeInstanceOf(LocationService);
  })
})
