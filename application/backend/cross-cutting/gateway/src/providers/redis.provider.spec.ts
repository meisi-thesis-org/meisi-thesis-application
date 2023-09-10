import { describe, expect, it } from 'vitest';
import { RedisProvider } from './redis.provider';

describe('RedisProvider', () => {
  const instance = new RedisProvider();

  it('should have an instance of RedisProvider', () => {
    expect(instance).toBeInstanceOf(RedisProvider)
  })
})
