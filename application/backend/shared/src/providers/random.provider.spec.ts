import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RandomProvider } from './random.provider';
import * as crypto from 'crypto';

describe('RandomProvider', () => {
  const instance = new RandomProvider();

  it('should have an instanceOf RandomProvider', () => {
    expect(instance).toBeInstanceOf(RandomProvider);
  })

  describe('randomUUID', () => {
    beforeEach(() => {
      vi.mock('crypto', () => ({
        randomUUID: vi.fn()
      }))

      vi.spyOn(crypto, 'randomUUID').mockReturnValue('dummyUuid' as any)
    })

    it('should provide a random uuid', () => {
      expect(instance.randomUUID()).toBe('dummyUuid')
    })
  })

  describe('randomUUID', () => {
    beforeEach(() => {
      vi.mock('crypto', () => ({
        randomBytes: vi.fn()
      }))

      vi.spyOn(crypto, 'randomBytes').mockReturnValue('dummyUuid' as any)
    })

    it('should provide a random string', () => {
      expect(instance.randomString(64)).toBe('dummyUuid')
    })
  })
})
