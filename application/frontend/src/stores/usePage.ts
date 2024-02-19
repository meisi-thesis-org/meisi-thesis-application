import { useFetch } from "@/composables/useFetch";
import type { PageEntity } from "@/types/Entities";
import type { Primitive } from "@/types/Primitive";
import { defineStore } from "pinia";
import { ref } from "vue";

const usePage = defineStore("pages", () => {
    const { createRequest } = useFetch();
    const state = ref<Array<PageEntity>>([])

    const findPageByUuid = async (
        uuid: string
    ) => {
        try {
            const response = await createRequest<PageEntity>(`commerce/pages/${uuid}`, 'GET');
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    const findPagesByChapterUuid = async (
        chapterUuid: string
    ) => {
        try {
            const response = await createRequest<PageEntity[]>('commerce/pages', 'GET', undefined, { chapterUuid });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    const createPage = async (data: Record<string, string | number>) => {
        try {
            const response = await createRequest<PageEntity>('commerce/pages', 'POST', data);
            state.value = [...state.value, response.data]
        } catch (error) {
            console.log(error)
        }
    }

    const updatePageByUuid = async (
        uuid: string,
        data: Record<string, Primitive>
    ) => {
        try {
            const response = await createRequest<PageEntity>(`commerce/pages/${uuid}`, 'PUT', data);
            state.value = state.value.map((page) => {
                if (page.uuid === response.data.uuid) {
                    page.description = response.data.description;
                    page.price = response.data.price;
                    page.active = response.data.active;
                    page.visible = response.data.visible;
                }
                return page
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        pages: state,
        findPageByUuid,
        findPagesByChapterUuid,
        createPage,
        updatePageByUuid,
        updateState: (pages: PageEntity[]) => state.value = pages
    }
})

export { usePage }