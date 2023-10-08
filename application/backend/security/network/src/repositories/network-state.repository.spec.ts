import { describe, it, expect } from 'vitest';
import { NetworkStateRepository } from './network-state.repository';

describe('NetworkStateRepository', () => {
  const instance = new NetworkStateRepository();

  it('should have an instanceOf NetworkStateRepository', () => {
    expect(instance).toBeInstanceOf(NetworkStateRepository)
  })
})
