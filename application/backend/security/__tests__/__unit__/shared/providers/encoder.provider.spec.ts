import { EncoderProvider } from '../../../../src/shared/providers/encoder.provider';
import bcrypt from 'bcrypt';

describe('EncoderProvider', () => {
  function callEncoderProvider(): EncoderProvider {
    return EncoderProvider.getInstance();
  }

  const dummyParameter = 'dummyParameter';
  const dummyParameterEncoded = 'dummyParameterEncoded';

  function callSpyOnBcryptHash(): void {
    jest.spyOn(bcrypt, 'hash').mockReturnValue(dummyParameterEncoded as any);
  }

  function callSpyOnBcryptCompare(): void {
    jest.spyOn(bcrypt, 'compare').mockReturnValue(true as any);
  }

  it('should have instance to be truthy', () => {
    expect(callEncoderProvider()).toBeTruthy()
  })

  it('should have encoded dummyParameter to be dummyParameterEncoded', async () => {
    callSpyOnBcryptHash()

    const data = await callEncoderProvider().encode(dummyParameter);

    expect(data).toBe(dummyParameterEncoded);
  })

  it('should have dummyParameter and dummyParameterEncoded compared to be true', async () => {
    callSpyOnBcryptCompare()

    const data = await callEncoderProvider().compareEncode(dummyParameter, dummyParameterEncoded);

    expect(data).toBe(true);
  })
})
