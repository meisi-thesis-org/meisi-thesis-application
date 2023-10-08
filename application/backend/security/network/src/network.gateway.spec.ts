import { describe, expect, it } from 'vitest';
import { NetworkGateway } from './network.gateway';

describe('NetworkGateway', () => {
  const instance = new NetworkGateway();

  it('should have an instanceOf NetworkGateway', () => {
    expect(instance).toBeInstanceOf(NetworkGateway)
  })
})
