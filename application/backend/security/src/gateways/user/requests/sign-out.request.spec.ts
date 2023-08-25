import { describe, expect, it } from 'vitest';
import { SignOutRequest } from './sign-out.request';

describe('SignOutRequest', () => {
  const dummyUuid: string = 'dummyUuid';

  const instance = new SignOutRequest(dummyUuid);

  it('should have an instanceOf SignOutRequest', () => {
    expect(instance).toBeInstanceOf(SignOutRequest);
  })

  it('should have an uuid to be dummyUuid', () => {
    expect(instance.getUuid()).toBe(dummyUuid);
  })
})
