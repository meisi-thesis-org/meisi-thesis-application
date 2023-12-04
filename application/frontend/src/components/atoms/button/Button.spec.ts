import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Button from "./Button.vue"
import Typography from "@/components/atoms/typography/Typography.vue";

describe("Button", () => {
    const createOptions = (
        props: Record<string, string>
    ): ComponentMountingOptions<typeof Button> => {
        return { props }
    }

    const createWrapper = (
        props: Record<string, string>
    ) => {
        return mount(Button, createOptions(props))
    }

    const dummyProps = {
        content: 'dummyContent',
        type: 'button'
    }

    it("should have correct attributes", () => {
        const wrapper = createWrapper(dummyProps)
        const component = wrapper.find("#button")
        expect(component.attributes()).toContain({ type: 'button' })
    })

    describe("Typography", () => {
        it("should exist", () => {
            const wrapper = createWrapper(dummyProps)
            const component = wrapper.findComponent(Typography)
            expect(component.exists()).toBe(true)
        })

        it("should have correct props", () => {
            const wrapper = createWrapper(dummyProps)
            const component = wrapper.findComponent(Typography)
            expect(component.props()).toEqual({ content: 'dummyContent', segment: 'placeholder' })
        })
    })
})