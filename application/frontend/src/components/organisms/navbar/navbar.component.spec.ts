import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavbarComponent from './navbar.component.vue';
import TypographyComponent from './../../atoms/typography/typography.component.vue';
import IconComponent from './../../atoms/icon/icon.component.vue';
import DividerComponent from './../../atoms/divider/divider.component.vue';

describe('NavbarComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(NavbarComponent)
  }
  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })

  it('should have Typography containing typography', () => {
    expect(callShallowMount().findComponent(TypographyComponent).exists()).toBe(true)
  })

  it('should have Icon containing icon', () => {
    expect(callShallowMount().findComponent(IconComponent).exists()).toBe(true)
  })

  it('should have DividerComponent containing divider', () => {
    expect(callShallowMount().findComponent(DividerComponent).exists()).toBe(true)
  })
})
