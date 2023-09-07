import { describe, expect, it } from 'vitest';
import { BookStateRepository } from './book-state.repository';

describe('BookStateRepository', () => {
  const instance = new BookStateRepository();

  it('should have an instanceOf BookStateRepository', () => {
    expect(instance).toBeInstanceOf(BookStateRepository);
  })
})
