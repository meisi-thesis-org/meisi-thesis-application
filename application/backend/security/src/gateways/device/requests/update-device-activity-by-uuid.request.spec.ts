import { describe, expect, it } from 'vitest';
import { UpdateDeviceActivityByUuidRequest } from './update-device-activity-by-uuid.request';

describe('UpdateDeviceActivityByUuidRequest', () => {
  const instance = new UpdateDeviceActivityByUuidRequest(
    'dummyUuid',
    true
  )

  it('should have an instanceOf of UpdateDeviceActivityByUuidRequest', () => {
    expect(instance).toBeInstanceOf(UpdateDeviceActivityByUuidRequest);
  })
})
