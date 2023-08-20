import { describe, expect, it } from 'vitest';
import { JournalApplication } from './journal.application';
describe('JournalApplication', () => {
  const journalApplication = new JournalApplication();

  it('should have an instanceOf JournalApplication', () => {
    process.env.RABBITMQ_URL = 'dummyURL';
    expect(journalApplication).instanceOf(JournalApplication);
  })
})
