import { describe, expect, it } from 'vitest';
import { BookController } from './book.controller';

describe('BookController', () => {
  const instance = new BookController();

  it('should have an instance of BookController', () => {
    expect(instance).toBeInstanceOf(BookController);
  })

  describe('findBooksByDossierUuid', () => {})
  describe('findBookByUuid', () => {})
  describe('createBook', () => {})
  describe('updateBookByUuid', () => {})
})
