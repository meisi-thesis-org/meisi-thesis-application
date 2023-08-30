import { describe, expect, it } from 'vitest';
import { DeviceService } from './device.service';

describe('DeviceService', () => {
  const instance = new DeviceService();

  it('should have an instanceOf DeviceService', () => {
    expect(instance).toBeInstanceOf(DeviceService);
  })
})
