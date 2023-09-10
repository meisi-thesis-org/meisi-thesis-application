import { describe, expect, it } from 'vitest';
import { GatewayService } from './gateway.service';

describe('GatewayService', () => {
  const instance = new GatewayService();

  it('should have an instanceOf GatewayService', () => {
    expect(instance).toBeInstanceOf(GatewayService)
  })
})
