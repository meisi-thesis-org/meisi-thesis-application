import { describe, it, expect } from 'vitest';
import { SignInRequest } from './sign-in.request';

describe('SignInRequest', () => {
  const dummyAccessCode = 'dummyAccessCode';

  const signInRequest = new SignInRequest(dummyAccessCode);

  it(`should have username toEqual ${dummyAccessCode}`, () => {
    expect(signInRequest.getAccessCode()).toEqual(dummyAccessCode)
  })
})
