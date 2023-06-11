import bcrypt from 'bcrypt';
import { RandomStringEncoderProvider } from '../../../src/providers/random-string-encoder.provider';

describe('RandomStringEncoderProvider', () => {
  const randomStringEncoderProvider = new RandomStringEncoderProvider();
  const dummyRawString = 'dummyRawString';
  const dummyHash = 'dummyHash';

  describe('and the hash method is called', () => {
    function callSpyOnHash(): void {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(dummyHash as never);
    }

    beforeEach(() => {
      jest.mock('bcrypt', () => ({
        hash: jest.fn()
      }))
    })

    it('should hash a random string', () => {
      callSpyOnHash();

      void expect(randomStringEncoderProvider.hash(dummyRawString, 10)).resolves.toEqual(dummyHash);
    })
  })

  describe('and the compare method is called', () => {
    function callSpyOnCompare(): void {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true)
    }

    beforeEach(() => {
      jest.mock('bcrypt', () => ({
        compare: jest.fn()
      }))
    })

    it('should compare a given random string with an hashed random string', () => {
      callSpyOnCompare()

      expect(randomStringEncoderProvider.compare(dummyRawString, dummyHash)).toBeTruthy();
    })
  })
})
