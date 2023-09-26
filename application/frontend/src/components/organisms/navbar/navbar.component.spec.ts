import { createShallowMountWrapper } from '@/wrappers';
import { describe, expect, it } from 'vitest';
import { NavbarComponent } from '.';

describe('NavbarComponent', () => {
  const navbarComponent = createShallowMountWrapper(NavbarComponent, {});

  it('should have instanceOf NavbarComponent', () => {
    expect(navbarComponent).toBeInstanceOf(NavbarComponent)
  })

  describe('divider component', () => {
    const foundDividerComponent = navbarComponent.find('DividerComponent');

    it('should exist', () => {
      expect(foundDividerComponent.exists()).toBe(true);
    })

    it('should contain correct attrivutes', () => {
      expect(foundDividerComponent.attributes()).toContain({
        width: '0.025rem',
        height: '2.5rem'
      });
    })
  })

  describe('typography', () => {})
  describe('icons', () => {})
})
