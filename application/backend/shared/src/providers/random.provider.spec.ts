import { describe, expect, it } from 'vitest';
import { RandomProvider } from './random.provider';

describe('RandomProvider', () => {
  const instance = new RandomProvider();

  it('should have an instance of UUID', () => {
    expect(instance).toBeTruthy();
  })
})
