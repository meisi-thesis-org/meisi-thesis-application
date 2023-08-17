import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EncoderProvider } from './encoder.provider';
import * as bcrypt from 'bcrypt';

describe('EncoderProvider', () => {
  const encoderProvider = new EncoderProvider();
  const encoderProviderMethods = {
    encode: async (
      rawValue: string | Buffer,
      rounds: number
    ) => await encoderProvider.encode(rawValue, rounds),
    compare: async (
      rawValue: string | Buffer,
      encodedValue: string
    ) => await encoderProvider.compare(rawValue, encodedValue)
  }

  beforeEach(() => {
    vi.mock('bcrypt', () => ({
      compare: vi.fn(),
      hash: vi.fn()
    }))
  })

  describe('encode', () => {
    const dummyRawValue = 'dummyRawValue';
    const dummyEncodedValue = 'dummyEncodedValue';

    beforeEach(() => {
      vi.spyOn(bcrypt, 'hash').mockResolvedValue(dummyEncodedValue as any)
    })

    it(`should encode ${dummyRawValue} to ${dummyEncodedValue}`, () => {
      void expect(encoderProvider.encode(dummyRawValue, 64)).resolves.toEqual(dummyEncodedValue)
    })
  })

  describe('compare', () => {
    const dummyRawValue = 'dummyRawValue';
    const dummyEncodedValue = 'dummyEncodedValue';

    beforeEach(() => {
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as any)
    })

    it('should equal true because rawValue and encodedValue fit the condition', async () => {
      void expect(encoderProviderMethods.compare(dummyRawValue, dummyEncodedValue)).resolves.toEqual(true)
    })
  })
})
