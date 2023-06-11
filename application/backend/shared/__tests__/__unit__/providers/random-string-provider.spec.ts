import { RandomStringProvider } from '../../../src/providers/random-string.provider'
import randomstring from 'randomstring';

describe('RandomStringProvider', () => {
  const randomStringProvider = new RandomStringProvider();
  const dummyGeneratedString = 'dummyGeneratedString';

  beforeEach(() => {
    jest.mock('randomstring', () => ({
      generate: jest.fn()
    }));

    jest.spyOn(randomstring, 'generate').mockReturnValue(dummyGeneratedString);
  })

  it('should generate a random string with specified length', () => {
    expect(randomStringProvider.generate(12)).toEqual(dummyGeneratedString);
  })
})
