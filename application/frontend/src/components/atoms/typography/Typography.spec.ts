import { describe, expect, it } from 'vitest';
import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import Typography from './Typography.vue'

describe('Typography', () => {
  const createOptions = (
    props: Record<string, string>
  ): ComponentMountingOptions<typeof Typography> => {
    return { props }
  }

  const createWrapper = (
    props: Record<string, string>
  ) => {
    return mount(Typography, createOptions(props))
  }

  describe.each([
    ['dummyContent', 'brand'],
    ['dummyContent', 'header'],
    ['dummyContent', 'sub-header'],
    ['dummyContent', 'paragraph'],
    ['dummyContent', 'label'],
    ['dummyContent', 'placeholder']
  ])('with correct segment and content', (content, segment) => {
    it('should have correct content', () => {
      const wrapper = createWrapper({ content, segment })
      const component = wrapper.findComponent('#typography')
      expect(component.text()).toContain(content)
    })

    it('should have correct classNames', () => {
      const wrapper = createWrapper({ content, segment })
      const component = wrapper.findComponent('#typography')
      expect(component.classes()).toContain(segment)
    })
  })
})
