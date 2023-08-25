import { describe, expect, it } from 'vitest';
import { ConnectionGateway } from './connection.gateway';

describe('ConnectionGateway', () => {
  const instance = new ConnectionGateway();

  it('should have an instanceOf ConnectionGateway', () => {
    expect(instance).toBeInstanceOf(ConnectionGateway);
  })

  describe('subscribe', () => {
    it('should be truthy', () => {
      expect(instance.subscribe()).toBeTruthy();
    })
  })
})
