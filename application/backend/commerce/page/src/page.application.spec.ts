import { describe, it, expect } from 'vitest';
import { PageApplication } from './page.application';

describe('PageApplication', () => {
  const instance = new PageApplication();

  it('should have an instanceOf PageApplication', () => {
    expect(instance).toBeInstanceOf(PageApplication);
  })
})
