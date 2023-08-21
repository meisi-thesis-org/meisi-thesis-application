import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RandomProvider } from './random.provider';
import * as crypto from 'crypto';

describe('RandomProvider', () => {
  const instance = new RandomProvider();

  it('should have an instanceOf RandomProvider', () => {
    expect(instance).toBeInstanceOf(RandomProvider);
  })

  beforeEach(() => {
    vi.mock('crypto', () => ({
      randomUUID: vi.fn(),
      randomBytes: vi.fn()
    }))
  })

  describe('randomUUID', () => {
    beforeEach(() => {
      vi.spyOn(crypto, 'randomUUID').mockReturnValue('dummyUuid' as any)
    })

    it('should provide a random uuid', () => {
      expect(instance.randomUUID()).toBe('dummyUuid')
    })
  })

  describe('randomBytes', () => {
    beforeEach(() => {
      vi.spyOn(crypto, 'randomBytes').mockReturnValue('dummyUuid' as any)
    })

    it('should provide a random string', () => {
      expect(instance.randomString(64)).toBe('dummyUuid')
    })
  })
})
