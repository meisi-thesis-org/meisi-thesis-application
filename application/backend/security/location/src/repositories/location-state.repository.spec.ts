import { describe, it, expect } from 'vitest';
import { LocationStateRepository } from './location-state.repository';

describe('LocationStateRepository', () => {
  const instance = new LocationStateRepository();

  it('should have an instanceOf LocationStateRepository', () => {
    expect(instance).toBeInstanceOf(LocationStateRepository)
  })
})
