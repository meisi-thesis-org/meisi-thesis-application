import { describe, expect, it } from "vitest";
import type { FormControlProps } from "./FormControl.type";
import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import FormControl from "./FormControl.vue";

describe("FormControl", () => {
    const defineComponentMountOptions = (
        overridedProps: FormControlProps
      ): ComponentMountingOptions<typeof FormControl> => {
        return {
          props: overridedProps
        }
      }
    
      const createWrapper = (
        overridedProps: FormControlProps
      ) => {
        return mount(FormControl, defineComponentMountOptions(overridedProps))
      }

      const defineProps = () => ({
        type: 'text',
        placeholder: 'dummyPlaceholder',
        rules: []
    })

      it("should have correct attributes", () => {
        const props = defineProps()
        const wrapper = createWrapper(props)
        expect(wrapper.attributes()).toContain({
            "placeholder": "dummyPlaceholder",
            "type": "text",
        })
      })
})