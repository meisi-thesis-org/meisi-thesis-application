import { describe, expect, it } from 'vitest';
import { BookGateway } from './book.gateway';

describe('BookGateway', () => {
  const instance = new BookGateway();

  it('should have an instanceOf BookGateway', () => {
    expect(instance).toBeInstanceOf(BookGateway)
  })
})
