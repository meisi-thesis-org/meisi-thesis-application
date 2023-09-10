import { describe, it, expect } from 'vitest';
import { GatewayApplication } from './gateway.application';

describe('GatewayApplication', () => {
  const instance = new GatewayApplication();

  it('should have an instanceOf GatewayApplication', () => {
    expect(instance).toBeInstanceOf(GatewayApplication);
  })
})
