import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FormControl from "./FormControl.vue"

describe("FormControl", () => {
    const createOptions = (
        props: Record<string, string>
    ): ComponentMountingOptions<typeof FormControl> => {
        return { props }
    }

    const createWrapper = (
        props: Record<string, string>
    ) => {
        return mount(FormControl, createOptions(props))
    }

    const dummyProps = {
        name: 'dummyName',
        placeholder: 'dummyPlaceholder',
        type: 'text'
    }

    it("should have correct attributes", () => {
        const wrapper = createWrapper(dummyProps)
        const component = wrapper.findComponent('input')
        expect(component.attributes()).toContain(dummyProps)
    })
})