import { describe, it, expect } from 'vitest';
import { DispatcherSchema } from './dispatcher.schema';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';

describe('DispatcherSchema', () => {
  const dispatcherSchemaProps = {
    routeURL: 'dummyRouteURL',
    correlationUuid: new RandomProvider().randomUUID(),
    toEmail: 'dummy@dummy.com',
    subject: 'dummySubject',
    content: 'dummyContent'
  }

  it('should equal the dispatcherSchemaProps as the schema is correct', () => {
    expect(DispatcherSchema.parse(dispatcherSchemaProps)).toEqual(dispatcherSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => DispatcherSchema.parse(null)).toThrow();
  })
})
