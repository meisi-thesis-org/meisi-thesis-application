import { describe, expect, it } from 'vitest';
import { SecurityGateway } from './security.gateway';

describe('SecurityGateway', () => {
  const instance = new SecurityGateway();

  it('should have an instanceOf SecurityGateway', () => {
    expect(instance).toBeInstanceOf(SecurityGateway);
  })

  describe('subscribe', () => {
    it('should be truthy', () => {
      expect(instance.subscribe()).toBeTruthy();
    })
  })
})
