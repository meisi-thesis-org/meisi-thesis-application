import { describe, expect, it } from "vitest";
import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import Typography from "@/components/atoms/typography/Typography.vue"
import FormControl from "@/components/atoms/form-control/FormControl.vue";
import FormSection from "./FormSection.vue"

describe("FormSection", () => {
    const createOptions = (
        props: Record<string, string>
    ): ComponentMountingOptions<typeof FormSection> => {
        return { components: { Typography, FormControl }, props }
    }

    const createWrapper = (
        props: Record<string, any>
    ) => {
        return mount(FormSection, createOptions(props))
    }

    const dummyProps: Record<string, any> = {
        designation: 'dummyDesignation',
        formControls: [
            {
                name: "dummyName",
                placeholder: "dummyPlaceholder",
                type: "text",
            }
        ]
    }

    it("should contain a Typography with correct props", () => {
        const wrapper = createWrapper(dummyProps)
        const component = wrapper.findComponent(Typography)
        expect(component.props()).toContain({ content: "dummyDesignation" })
    })

    it("should contain a FormControl with correct props", () => {
        const wrapper = createWrapper(dummyProps)
        const component = wrapper.findComponent(FormControl)
        expect(component.props()).toContain({
            name: "dummyName",
            placeholder: "dummyPlaceholder",
            type: "text",
        })
    })
})