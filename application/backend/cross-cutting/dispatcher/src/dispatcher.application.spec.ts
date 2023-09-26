import { describe, expect, it } from 'vitest';
import { DispatcherApplication } from './dispatcher.application';

describe.skip('DispatcherApplication', () => {
  const instance = new DispatcherApplication();

  it('should have an instanceOf DispatcherApplication', () => {
    expect(instance).toBeInstanceOf(DispatcherApplication);
  })
})
