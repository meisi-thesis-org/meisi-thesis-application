import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavbarComponent from './navbar.component.vue';

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
    expect(callShallowMount().find('.typography').exists()).toBe(true)
  })

  it('should have Icon containing icon', () => {
    expect(callShallowMount().find('.typography').exists()).toBe(true)
  })

  it('should have DividerComponent containing divider', () => {
    expect(callShallowMount().find('.divider').exists()).toBe(true)
  })
})
