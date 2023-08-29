import { describe, expect, it } from 'vitest';
import { FindLocationsRequest } from './find-locations.request';

describe('FindLocationsRequest', () => {
  const instance = new FindLocationsRequest(
    'dummyUserUuid',
    undefined,
    undefined
  );

  it('should have an instanceOf of FindLocationsRequest', () => {
    expect(instance).toBeInstanceOf(FindLocationsRequest);
  })
})
