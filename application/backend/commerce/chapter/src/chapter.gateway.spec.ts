import { describe, expect, it } from 'vitest';
import { ChapterGateway } from './chapter.gateway';

describe('ChapterGateway', () => {
  const instance = new ChapterGateway();

  it('should have an instanceOf ChapterGateway', () => {
    expect(instance).toBeInstanceOf(ChapterGateway)
  })
})
