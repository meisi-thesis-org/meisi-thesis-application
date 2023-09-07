import { describe, expect, it } from 'vitest';
import { ChapterStateRepository } from './chapter-state.repository';

describe('ChapterStateRepository', () => {
  const instance = new ChapterStateRepository();

  it('should have an instanceOf ChapterStateRepository', () => {
    expect(instance).toBeInstanceOf(ChapterStateRepository);
  })
})
