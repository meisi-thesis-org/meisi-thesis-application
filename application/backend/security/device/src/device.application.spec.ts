import { describe, it, expect } from 'vitest';
import { DeviceApplication } from './device.application';

describe('DeviceApplication', () => {
  const instance = new DeviceApplication();

  it('should have an instanceOf DeviceApplication', () => {
    expect(instance).toBeInstanceOf(DeviceApplication);
  })
})
