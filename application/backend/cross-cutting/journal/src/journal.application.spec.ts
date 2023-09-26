import { describe, it, expect } from 'vitest';
import { JournalApplication } from './journal.application';

describe.skip('JournalApplication', () => {
  const instance = new JournalApplication();

  it('should have an instanceOf JournalApplication', () => {
    expect(instance).toBeInstanceOf(JournalApplication);
  })
})
