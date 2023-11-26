import { describe, expect, it } from "vitest";
import type { FormButtonProps } from "./FormButton.type";
import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import FormButton from "./FormButton.vue";
import Typography from "@/components/atoms/Typography/Typography.vue";

describe("Button", () => {
  const defineComponentMountOptions = (
    overridedProps: FormButtonProps
  ): ComponentMountingOptions<typeof FormButton> => {
    return {
      global: {
        components: {
          Typography
        }
      },
      props: overridedProps
    }
  }

  const createWrapper = (
    overridedProps: FormButtonProps
  ) => {
    return mount(FormButton, defineComponentMountOptions(overridedProps))
  }

  const overridedProps = {
    content: "Continue",
    color: 'dark-theme'
  } as FormButtonProps

  it('should have correct properties', () => {
    const wrapper = createWrapper(overridedProps)
    expect(wrapper.props()).toEqual(overridedProps)
  })

  it('should have correct components rendered', () => {
    const wrapper = createWrapper(overridedProps)
    const component = wrapper.findComponent(Typography)
    expect(component.exists()).toBe(true)
  })
})