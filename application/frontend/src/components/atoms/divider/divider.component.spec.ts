import { afterEach, describe, expect, it, vi } from 'vitest';
import DividerComponent from './divider.component.vue';
import { type VueWrapper, shallowMount } from '@vue/test-utils';

describe('DividerComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(DividerComponent, {
      props: {
        width: '0.5rem',
        height: '0.5rem'
      }
    })
  }

  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })
})
