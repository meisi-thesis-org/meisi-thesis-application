import { describe, expect, it } from 'vitest';
import { UpdateActivityByUuidRequest } from './update-activity-by-uuid.request';

describe('UpdateActivityByUuidRequest', () => {
  const instance = new UpdateActivityByUuidRequest(
    'dummyUuid',
    true
  );

  it('should have an instanceOf of UpdateActivityByUuidRequest', () => {
    expect(instance).toBeInstanceOf(UpdateActivityByUuidRequest);
  })
})
