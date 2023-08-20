import { DispatchApplication } from './dispatch.application';
import { describe, expect, it } from 'vitest';

describe('DispatchApplication', () => {
  const instance = new DispatchApplication();

  it('should have an instanceOf DispatchApplication', () => {
    expect(instance).instanceOf(DispatchApplication);
  })
})
