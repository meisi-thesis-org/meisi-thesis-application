import { describe, expect, it } from 'vitest';
import { LocationGateway } from './location.gateway';

describe('LocationGateway', () => {
  const instance = new LocationGateway();

  it('should have an instanceOf LocationGateway', () => {
    expect(instance).toBeInstanceOf(LocationGateway);
  })

  describe('subscribe', () => {
    it('should be truthy', () => {
      expect(instance.subscribe()).toBeTruthy();
    })
  })
})
