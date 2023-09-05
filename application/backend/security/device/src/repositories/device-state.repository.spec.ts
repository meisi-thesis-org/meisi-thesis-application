import { describe, it, expect } from 'vitest';
import { DeviceStateRepository } from './device-state.repository';

describe('DeviceStateRepository', () => {
  const instance = new DeviceStateRepository();

  it('should have an instanceOf DeviceStateRepository', () => {
    expect(instance).toBeInstanceOf(DeviceStateRepository)
  })
})
