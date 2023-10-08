import { describe, it, expect } from 'vitest';
import { NetworkApplication } from './network.application';

describe('NetworkApplication', () => {
  const instance = new NetworkApplication();

  it('should have an instanceOf NetworkApplication', () => {
    expect(instance).toBeInstanceOf(NetworkApplication);
  })
})
