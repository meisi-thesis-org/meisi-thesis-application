import { describe, expect, it } from 'vitest';
import { JournalApplication } from './journal.application';

describe('JournalApplication', () => {
  const journalApplication = new JournalApplication();

  it('should have an instanceOf JournalApplication', () => {
    expect(journalApplication).instanceOf(JournalApplication);
  })
})
