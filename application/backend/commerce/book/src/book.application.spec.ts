import { describe, it, expect } from 'vitest';
import { BookApplication } from './book.application';

describe('BookApplication', () => {
  const instance = new BookApplication();

  it('should have an instanceOf BookApplication', () => {
    expect(instance).toBeInstanceOf(BookApplication);
  })
})
