import { TokenProvider } from '../../../../src/shared/providers/token.provider';
import jsonwebtoken from 'jsonwebtoken';

describe('TokenProvider', () => {
  function callTokenProvider(): TokenProvider {
    return TokenProvider.getInstance();
  }

  const dummyToken = 'dummyToken';
  const dummyPayload = { dummy: 'dummy' };
  const dummyTokenSecret = 'dummyTokenSecret';

  function callJsonWebTokenSign(): void {
    jest.spyOn(jsonwebtoken, 'sign').mockReturnValue(dummyToken as any)
  }

  function callJsonWebTokenVerify(): void {
    jest.spyOn(jsonwebtoken, 'verify').mockReturnValue(dummyPayload as any)
  }

  it('should have token created', () => {
    callJsonWebTokenSign()

    expect(callTokenProvider().createToken(dummyPayload, dummyTokenSecret, '1d')).toBe(dummyToken);
  })

  it('should have token verified', () => {
    callJsonWebTokenVerify();

    expect(callTokenProvider().verifyToken(dummyToken, dummyTokenSecret)).toBe(dummyPayload);
  })
})
