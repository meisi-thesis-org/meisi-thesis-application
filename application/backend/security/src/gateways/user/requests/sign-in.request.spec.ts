import { describe, expect, it } from 'vitest';
import { SignInRequest } from './sign-in.request';

describe('SignInRequest', () => {
  const dummyAccessCode: string = 'dummyAccessCode';

  const instance = new SignInRequest(dummyAccessCode);

  it('should have an instanceOf SignInRequest', () => {
    expect(instance).toBeInstanceOf(SignInRequest);
  })

  it('should have an accessCode to be dummyAccessCode', () => {
    expect(instance.getAccessCode()).toBe(dummyAccessCode);
  })
})
