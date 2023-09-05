import { describe, it, expect } from 'vitest';
import { ChapterApplication } from './chapter.application';

describe('ChapterApplication', () => {
  const instance = new ChapterApplication();

  it('should have an instanceOf ChapterApplication', () => {
    expect(instance).toBeInstanceOf(ChapterApplication);
  })
})
