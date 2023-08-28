import { describe, expect, it } from 'vitest';
import { UpdateStatusByUuidRequest } from './update-status-by-uuid.request';

describe('UpdateStatusByUuidRequest', () => {
  const instance = new UpdateStatusByUuidRequest(
    'dummyUuid',
    true
  );

  it('should have an instanceOf of UpdateStatusByUuidRequest', () => {
    expect(instance).toBeInstanceOf(UpdateStatusByUuidRequest);
  })
})
