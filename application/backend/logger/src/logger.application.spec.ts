import { describe, expect, it } from 'vitest';
import { LoggerApplication } from './logger.application';

describe('LoggerApplication', () => {
  const application = new LoggerApplication();

  it('should have instanceOf LoggerApplication', () => {
    expect(application).toBeInstanceOf(LoggerApplication);
  })
})
