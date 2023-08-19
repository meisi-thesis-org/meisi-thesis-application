import { describe, it, expect } from 'vitest';
import { JournalEntity } from './journal.entity';
import { randomUUID } from 'crypto';

describe('JournalEntity', () => {
  const dummyUuid = randomUUID();
  const dummySeverity = 'Error';
  const dummyCorrelationUuid = randomUUID();
  const dummyURL = 'dummyURL';
  const dummyCause = 'dummyCause';

  const instance = new JournalEntity<string>(
    dummyUuid,
    dummySeverity,
    dummyCorrelationUuid,
    dummyURL,
    dummyCause
  );

  it('should have an instanceOf JournalEntity', () => {
    expect(instance).instanceOf(JournalEntity);
  })

  it('should have instance.getUuid toEqual dummyUuid', () => {
    expect(instance.getUuid()).toEqual(dummyUuid);
  })

  it('should have instance.getSeverity toEqual dummySeverity', () => {
    expect(instance.getSeverity()).toEqual(dummySeverity);
  })

  it('should have instance.getCorrelationUuid toEqual dummyCorrelationUuid', () => {
    expect(instance.getCorrelationUuid()).toEqual(dummyCorrelationUuid);
  })

  it('should have instance.getURL toEqual dummyURL', () => {
    expect(instance.getUrl()).toEqual(dummyURL);
  })

  it('should have instance.getCause toEqual dummyCause', () => {
    expect(instance.getCause()).toEqual(dummyCause);
  })
})
