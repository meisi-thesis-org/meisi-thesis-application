import { describe, expect, it } from 'vitest';
import { JournalApplication } from './journal.application';

describe('JournalApplication', () => {
  const instance = new JournalApplication();

  it('should have an instanceOf JournalApplication', () => {
    expect(instance).toBeInstanceOf(JournalApplication);
  })
})
