import { describe, expect, it } from 'vitest';
import { DeviceController } from './device.controller';

describe('DeviceController', () => {
  const instance = new DeviceController();

  it('should have an instanceOf DeviceController', () => {
    expect(instance).toBeInstanceOf(DeviceController);
  })
})
