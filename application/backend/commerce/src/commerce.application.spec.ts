import { describe, it, expect } from 'vitest';
import { CommerceApplication } from './commerce.application';

describe('CommerceApplication', () => {
  const instance = new CommerceApplication();

  it('should have an instanceOf CommerceApplication', () => {
    expect(instance).toBeInstanceOf(CommerceApplication);
  })
})
