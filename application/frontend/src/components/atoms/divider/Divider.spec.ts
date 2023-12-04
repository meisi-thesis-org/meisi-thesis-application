import { type ComponentMountingOptions, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Divider from "./Divider.vue"

describe("Divider", () => {
    const createOptions = (
        props: Record<string, string>
    ): ComponentMountingOptions<typeof Divider> => {
        return { props }
    }

    const createWrapper = (
        props: Record<string, string>
    ) => {
        return mount(Divider, createOptions(props))
    }

    it("should exist", () => {
        const wrapper = createWrapper({ width: '1rem', height: '1rem' });
        const component = wrapper.findComponent("#divider");
        expect(component.exists()).toBe(true)
    })
})