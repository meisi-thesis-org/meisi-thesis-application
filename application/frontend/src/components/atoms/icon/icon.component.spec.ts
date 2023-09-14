import { afterEach, describe, expect, it, vi } from 'vitest';
import IconComponent from './icon.component.vue';
import { type VueWrapper, shallowMount } from '@vue/test-utils';

describe('IconComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(IconComponent, {
      props: {
        name: 'menu',
        color: 'dark',
        size: 'maximum'
      }
    })
  }

  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })
})
