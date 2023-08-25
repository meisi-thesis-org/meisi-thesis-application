import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HashProvider } from './hash.provider';
import { InternalServerException } from '../exceptions/internal-server.exception';
import * as bcrypt from 'bcrypt';

describe('HashProvider', () => {
  const instance = new HashProvider();

  it('should have an instanceOf HashProvider', () => {
    expect(instance).instanceOf(HashProvider);
  })

  beforeEach(() => {
    vi.mock('bcrypt', () => ({
      genSalt: vi.fn(),
      hash: vi.fn(),
      compare: vi.fn()
    }))
  })

  describe('hash', () => {
    it('should return a hash', async () => {
      vi.spyOn(bcrypt, 'hash').mockResolvedValue('dummyHash' as any)

      await expect(instance.hash('dummyData')).resolves.toBe('dummyHash');
    })

    it('should throw an exception because an error ocurred while generating a salt', async () => {
      vi.spyOn(bcrypt, 'genSalt').mockRejectedValue(new InternalServerException())

      await expect(instance.hash('dummyData')).rejects.toThrowError(InternalServerException);
    })

    it('should throw an exception because an error ocurred while generating a hash', async () => {
      vi.spyOn(bcrypt, 'hash').mockRejectedValue(new InternalServerException())

      await expect(instance.hash('dummyData')).rejects.toThrowError(InternalServerException);
    })
  })

  describe('compare', () => {
    it('should return true', async () => {
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as any)

      await expect(instance.compare('dummyData', 'dummyData')).resolves.toBe(true);
    })

    it('should return true', async () => {
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(false as any)

      await expect(instance.compare('dummyData', 'hashedDummyData')).resolves.toBe(false);
    })

    it('should return true', async () => {
      vi.spyOn(bcrypt, 'compare').mockRejectedValue(new Error())

      await expect(async () => await instance.compare('dummyData', 'hashedDummyData')).rejects.toThrow();
    })
  })
})
