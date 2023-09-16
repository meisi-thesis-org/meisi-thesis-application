import { describe, expect, it } from 'vitest';
import { createShallowMountWrapper } from '../../../../wrappers';
import { TypographyComponent } from '..';

describe('TypographyComponent', () => {
  it('should have a snapshot', () => {
    expect(createShallowMountWrapper(TypographyComponent)).toMatchSnapshot();
  })
})
