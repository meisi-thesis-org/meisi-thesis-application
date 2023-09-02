import { describe, expect, it } from 'vitest';
import { CommerceGateway } from './commerce.gateway';

describe('CommerceGateway', () => {
  const instance = new CommerceGateway();

  it('should have an instanceOf CommerceGateway', () => {
    expect(instance).toBeInstanceOf(CommerceGateway);
  })

  describe('subscribe', () => {
    it('should be truthy', () => {
      expect(instance.subscribe()).toBeTruthy();
    })
  })
})
