import { afterEach, describe, expect, it, vi } from 'vitest';
import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { FormGroupComponent } from '.';
import { TypographyComponent } from './../../atoms/typography';
import { FormControlComponent } from './../../atoms/form-control';

describe('FormGroupComponent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  function callShallowMount (): VueWrapper {
    return shallowMount(FormGroupComponent, {
      props: {
        name: 'dummyName',
        formControlCollection: [
          {
            type: 'text',
            placeholder: 'dummyPlaceholder',
            value: 'dummyValue',
            required: false
          }
        ]
      }
    })
  }

  it('should have a typography component with required attributes', () => {
    expect(callShallowMount().findComponent(TypographyComponent).attributes()).toContain({
      content: 'dummyName',
      segment: 'label'
    })
  })

  it('should have a typography component with required attributes', () => {
    expect(callShallowMount().findComponent(FormControlComponent).attributes()).toContain({
      type: 'text',
      placeholder: 'dummyPlaceholder',
      value: 'dummyValue',
      required: 'false'
    })
  })
})
