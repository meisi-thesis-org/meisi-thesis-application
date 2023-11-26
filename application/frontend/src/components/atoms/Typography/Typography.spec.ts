import { describe, expect, it } from 'vitest'
import Typography from './Typography.vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { type TypographyProps } from './Typography.type';

describe('Typography', () => {
  const defineComponentMountOptions = (
    overridedProps: TypographyProps
  ): ComponentMountingOptions<typeof Typography> => {
    return {
      props: overridedProps
    }
  }

  const createWrapper = (
    overridedProps: TypographyProps
  ) => {
    return mount(Typography, defineComponentMountOptions(overridedProps))
  }

  describe.each([
    ['brand', 'dummyContent', 'dark-theme'],
    ['header', 'dummyContent', 'dark-theme'],
    ['sub-header', 'dummyContent', 'dark-theme'],
    ['paragraph', 'dummyContent', 'dark-theme'],
    ['designation', 'dummyContent', 'dark-theme'],
  ])('when iteration is = %s', (segment, content, color) => {
    const overridedProps = { content, segment, color } as TypographyProps

    it('should have correct properties', () => {
      expect(createWrapper(overridedProps).props()).toEqual(overridedProps)
    })

    it('should have correct p text', () => {
      const wrapper = createWrapper(overridedProps)
      const component = wrapper.find('#typography')
      expect(component.text()).toEqual(overridedProps.content)
    })

    it('should have correct p classes', () => {
      const wrapper = createWrapper(overridedProps)
      const component = wrapper.find('#typography')
      expect(component.classes()).toEqual([overridedProps.color, overridedProps.segment])
    })
  })
})
