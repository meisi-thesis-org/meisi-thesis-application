import { SecurityApplication } from './security.application';
import { describe, it, expect } from 'vitest';

describe('SecurityApplication', () => {
  const instance = new SecurityApplication();

  it('should have an instanceOf SecurityApplication', () => {
    expect(instance).toBeInstanceOf(SecurityApplication);
  })
})
