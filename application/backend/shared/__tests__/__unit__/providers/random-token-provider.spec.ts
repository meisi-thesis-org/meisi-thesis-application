import { RandomTokenProvider } from '../../../src/providers/random-token.provider';
import jsonwebtoken from 'jsonwebtoken';

describe('RandomTokenProvider', () => {
  const randomTokenProvider = new RandomTokenProvider();

  const dummyPayload = { dummyPayload: 'dummyPayload' };
  const dummySecret = 'dummySecret';
  const dummyExpiresIn = '1h';
  const dummyToken = 'dummyToken';

  const toolbox = {
    sign: () => { return randomTokenProvider.sign(dummyPayload, dummySecret, dummyExpiresIn) },
    decode: () => { return randomTokenProvider.decode(dummyToken) },
    verify: () => { return randomTokenProvider.verify(dummyToken, dummySecret) }
  }

  beforeEach(() => {
    jest.mock('jsonwebtoken', () => ({
      ...jest.requireActual('jsonwebtoken'),
      sign: jest.fn(),
      decode: jest.fn(),
      verify: jest.fn()
    }));

    jest.spyOn(jsonwebtoken, 'sign').mockReturnValue(dummyToken as any);
    jest.spyOn(jsonwebtoken, 'decode').mockReturnValue(dummyPayload as any);
    jest.spyOn(jsonwebtoken, 'verify').mockReturnValue(dummyPayload as any);
  })

  it('should have token signed', () => {
    expect(toolbox.sign()).toBe(dummyToken)
  })

  it('should have token decoded', () => {
    expect(toolbox.decode()).toBe(dummyPayload)
  })
  it('should have token verified', () => {
    expect(toolbox.verify()).toBe(dummyPayload)
  })
})
