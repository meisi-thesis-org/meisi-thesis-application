import { describe, expect, it } from 'vitest';
import { FindLocationByUuidRequest } from './find-location-by-uuid.request';

describe('FindLocationByUuidRequest', () => {
  const instance = new FindLocationByUuidRequest(
    'dummyUuid'
  );

  it('should have an instanceOf of FindLocationByUuidRequest', () => {
    expect(instance).toBeInstanceOf(FindLocationByUuidRequest);
  })
})
