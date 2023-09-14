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
        width: 10,
        height: 10
      }
    })
  }

  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })
})
