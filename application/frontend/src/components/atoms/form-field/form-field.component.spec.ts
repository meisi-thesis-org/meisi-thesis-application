import { afterEach, describe, expect, it, vi } from 'vitest';
import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { FormFieldComponent } from '.';

describe('FormFieldComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(FormFieldComponent, {
      props: {
        type: 'text',
        placeholder: 'dummyPlaceholder'
      }
    })
  }

  it('should match the snapshot', () => {
    expect(callShallowMount()).toMatchSnapshot();
  })
})
