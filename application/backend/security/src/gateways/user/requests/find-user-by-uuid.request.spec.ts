import { describe, expect, it } from 'vitest';
import { FindUserByUuidRequest } from './find-user-by-uuid.request';

describe('FindUserByUuidRequest', () => {
  const dummyUuid = '';

  const instance = new FindUserByUuidRequest(dummyUuid);

  it('should have an instanceOf FindUserByUuidRequest', () => {
    expect(instance).toBeInstanceOf(FindUserByUuidRequest);
  })

  it('should have an accessCode to be dummyUuid', () => {
    expect(instance.getUuid()).toBe(dummyUuid);
  })
})
