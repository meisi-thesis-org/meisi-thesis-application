import { afterEach, describe, expect, it, vi } from 'vitest';
import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { ButtonComponent } from '.';
import { TypographyComponent } from './../../atoms/typography';

describe('ButtonComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(ButtonComponent, {
      props: {
        content: 'dummyContent',
        action: () => {}
      }
    })
  }

  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })

  describe('typography', () => {
    it('should exist', () => {
      const wrapper = callShallowMount();
      expect(wrapper.findComponent(TypographyComponent).exists()).toBe(true);
    })

    it('should have content attribute', () => {
      const wrapper = callShallowMount();
      expect(wrapper.findComponent(TypographyComponent).attributes().content).toBe('dummyContent');
    })
  })
})
