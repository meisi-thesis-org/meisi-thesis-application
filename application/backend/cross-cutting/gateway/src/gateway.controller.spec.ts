import { describe, expect, it } from 'vitest';
import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
  const instance = new GatewayController();

  it('should have an instanceOf GatewayController', () => {
    expect(instance).toBeInstanceOf(GatewayController)
  })
})
