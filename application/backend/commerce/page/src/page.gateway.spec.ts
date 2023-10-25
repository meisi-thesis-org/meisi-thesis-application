import { describe, expect, it } from 'vitest';
import { PageGateway } from './page.gateway';

describe('PageGateway', () => {
  const instance = new PageGateway();

  it('should have an instanceOf PageGateway', () => {
    expect(instance).toBeInstanceOf(PageGateway)
  })
})
