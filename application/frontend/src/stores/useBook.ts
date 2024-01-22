import { useFetch } from "@/composables/useFetch";
import type { BookEntity } from "@/types/Entities";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBook = defineStore("books", () => {
    const { createRequest } = useFetch();
    const state = ref<Array<BookEntity>>()

    const findBookByUuid = async (
        uuid: string
    ) => {
        try {
            const response = await createRequest<BookEntity>('commerce/books', 'GET', undefined, { uuid });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    const findBooksByDossierUuid = async (
        dossierUuid: string
    ) => {
        try {
            const response = await createRequest<BookEntity[]>('commerce/books', 'GET', undefined, { dossierUuid });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    const createBook = async (data: Record<string, string>) => {
        try {
            const response = await createRequest<BookEntity>('commerce/books', 'POST', data);
            state.value?.push(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateBookByUuid = async (
        uuid: string,
        data: Record<string, string>
    ) => {
        try {
            const response = await createRequest<BookEntity>(`commerce/books/${uuid}`, 'PUT', data);
            state.value?.forEach((element) => {
                if (element.uuid === response.data.uuid) 
                    element = response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        books: state,
        findBookByUuid,
        findBooksByDossierUuid,
        createBook,
        updateBookByUuid
    }
})