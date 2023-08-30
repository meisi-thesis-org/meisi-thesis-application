import { describe, expect, it } from 'vitest';
import { DeviceGateway } from './device.gateway';

describe('DeviceGateway', () => {
  const instance = new DeviceGateway();

  it('should have an instanceOf DeviceGateway', () => {
    expect(instance).toBeInstanceOf(DeviceGateway);
  })

  describe('subscribe', () => {
    it('should be truthy', () => {
      expect(instance.subscribe()).toBeTruthy();
    })
  })
})
