import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import * as crypto from 'crypto';
import { RandomizerProvider } from './randomizer.provider';

describe('RamomizerProvider', () => {
  const randomizerProvider = new RandomizerProvider();

  beforeEach(() => {
    vi.mock('crypto', () => ({
      randomUUID: vi.fn(),
      randomBytes: vi.fn()
    }))
  })

  afterEach(() => {
    vi.clearAllMocks();
  })

  describe('randomUuid', () => {
    const dummyRandomUuid = 'dummyRandomUuid';

    beforeEach(() => {
      vi.spyOn(crypto, 'randomUUID').mockReturnValue(dummyRandomUuid as any);
    })

    function randomizerProviderRandomUUID (): crypto.UUID {
      return randomizerProvider.randomUUID();
    }

    it(`should have a UUID containing ${dummyRandomUuid}`, () => {
      expect(randomizerProviderRandomUUID()).toBe(dummyRandomUuid)
    })
  })

  describe('randomString', () => {
    const dummyRandomString = 'dummyRandomString';

    beforeEach(() => {
      vi.spyOn(crypto, 'randomBytes').mockReturnValue(dummyRandomString as any);
    })

    function randomizerProviderRandomString (length: number): string {
      return randomizerProvider.randomString(length);
    }

    it('should randomize a string with a specified length', () => {
      expect(randomizerProviderRandomString(17)).toHaveLength(17)
    })

    it(`should have a string containing ${dummyRandomString}`, () => {
      expect(randomizerProviderRandomString(17)).toBe(dummyRandomString)
    })
  })
})
