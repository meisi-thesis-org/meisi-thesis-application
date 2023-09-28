import { createShallowMountWrapper } from '@/wrappers';
import { describe, expect, it } from 'vitest';
import { MenuComponent } from './menu';

describe('MenuComponent', () => {
  const wrapper = createShallowMountWrapper(MenuComponent, {});

  it('should have an instanceOf MenuComponent', () => {
    expect(wrapper).toBeInstanceOf(MenuComponent)
  })
})
