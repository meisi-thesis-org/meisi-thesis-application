import { mount, type ComponentMountingOptions, flushPromises } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Link from "./Link.vue"
import Typography from "@/components/atoms/typography/Typography.vue";
import { useRouter } from "vue-router";

vi.mock('vue-router', () => ({ useRouter: vi.fn() }))
const mockedRouter = vi.mocked(useRouter)

describe("Link", () => {
    const createOptions = (
        props: Record<string, string>
    ): ComponentMountingOptions<typeof Link> => {
        return { props, global: { components: { Typography } } }
    }

    const createWrapper = (
        props: Record<string, string>
    ) => {
        return mount(Link, createOptions(props))
    }

    const dummyProps = {
        content: 'dummyContent',
        href: 'dummyPath'
    }

    it("should have called router on click", async () => {
        createWrapper(dummyProps)
        expect(mockedRouter).toHaveBeenCalled()
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