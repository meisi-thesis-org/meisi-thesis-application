import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import TypographyComponent from './typography.component.vue';

describe('TypographyComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(TypographyComponent, {
      props: {
        content: 'dummyContent',
        typography: 'brand'
      }
    })
  }
  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })

  it('should match the snapshot', () => {
    expect(callShallowMount().find('span').text()).toEqual('dummyContent');
  })
})
