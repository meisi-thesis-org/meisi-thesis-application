import { afterEach, describe, expect, it, vi } from 'vitest';
import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { FormControlComponent } from '.';

describe('FormControlComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(FormControlComponent, {
      props: {
        type: 'text',
        placeholder: 'dummyPlaceholder',
        value: 'dummyValue',
        required: true
      }
    })
  }

  it('should have an input', () => {
    expect(callShallowMount().find('input').exists()).toBe(true);
  })

  it('should have an input with a type attribute', () => {
    expect(callShallowMount().find('input').attributes().type).toBe('text');
  })

  it('should have an input with a placeholder attribute', () => {
    expect(callShallowMount().find('input').attributes().placeholder).toBe('dummyPlaceholder');
  })

  it('should have an input with a required attribute', () => {
    expect(callShallowMount().find('input').attributes().required).toBeDefined();
  })
})
