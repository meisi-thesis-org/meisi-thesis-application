import { describe, expect, it } from 'vitest';
import { RefreshTokensRequest } from './refresh-tokens.request';

describe('RefreshTokensRequest', () => {
  const dummyUuid: string = 'dummyUuid';

  const instance = new RefreshTokensRequest(dummyUuid);

  it('should have an instanceOf RefreshTokensRequest', () => {
    expect(instance).toBeInstanceOf(RefreshTokensRequest);
  })

  it('should have an uuid to be dummyUuid', () => {
    expect(instance.getUuid()).toBe(dummyUuid);
  })
})
