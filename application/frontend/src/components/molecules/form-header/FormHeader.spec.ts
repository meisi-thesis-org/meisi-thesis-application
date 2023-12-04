import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FormHeader from "./FormHeader.vue"
import Typography from "@/components/atoms/typography/Typography.vue"

describe("FormHeader", () => {
    const createOptions = (
        props: Record<string, string>
    ): ComponentMountingOptions<typeof FormHeader> => {
        return { components: { Typography }, props }
    }

    const createWrapper = (
        props: Record<string, string>
    ) => {
        return mount(FormHeader, createOptions(props))
    }

    it("should have a TypographyComponent with correct header props", () => {
        const wrapper = createWrapper({ header: 'dummyHeader', subHeader: 'dummySubHeader' })
        const component = wrapper.find(".header")
        expect(component.exists()).toBe(true)
        expect(component.getCurrentComponent()?.props).toEqual({
            "content": "dummyHeader",
            "segment": "header",
        })
    })

    it("should have a TypographyComponent with correct subHeader props", () => {
        const wrapper = createWrapper({ header: 'dummyHeader', subHeader: 'dummySubHeader' })
        const component = wrapper.find(".sub-header")
        expect(component.exists()).toBe(true)
        expect(component.getCurrentComponent()?.props).toEqual({
            "content": "dummySubHeader",
            "segment": "sub-header",
        })
    })
})