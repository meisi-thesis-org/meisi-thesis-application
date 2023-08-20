import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HashProvider } from './hash.provider';
import { InternalServerException } from '../exceptions/internal-server.exception';
import * as bcrypt from 'bcrypt';

describe('HashProvider', () => {
  const instance = new HashProvider();

  it('should have an instanceOf HashProvider', () => {
    expect(instance).instanceOf(HashProvider);
  })

  describe('hash', () => {
    beforeEach(() => {
      vi.mock('bcrypt', () => ({
        genSalt: vi.fn(),
        hash: vi.fn()
      }))
    })

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
})
