import { describe, expect, it } from 'vitest';
import { FindDevicesRequest } from './find-devices.request';

describe('FindDevicesRequest', () => {
  const instance = new FindDevicesRequest(
    'dummyUserUuid',
    'dummyIpAddress',
    'dummyPlatform',
    'dummyModel'
  )

  it('should have an instanceOf of FindDevicesRequest', () => {
    expect(instance).toBeInstanceOf(FindDevicesRequest);
  })
})
