import { describe, it, expect } from 'vitest';
import { dispatchSchema } from './dispatch.schema';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

describe('DispatchSchema', () => {
  const schema = {
    correlationUuid: new RandomProvider().randomUuid(),
    severity: 'Error',
    url: 'dummyURL',
    toEmail: 'dummyToEmail',
    subject: 'dummySubject',
    content: 'dummyContent'
  }

  it('should parse schema toEqual schema', () => {
    expect(dispatchSchema.parse(schema)).toEqual(schema);
  })

  it('should throw an error because parse is invalid', () => {
    schema.severity = '';

    expect(() => dispatchSchema.parse(schema)).toThrowError();
  })
})
