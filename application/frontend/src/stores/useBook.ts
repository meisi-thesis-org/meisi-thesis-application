import { useFetch } from "@/composables/useFetch";
import type { BookEntity } from "@/types/Entities";
import type { Primitive } from "@/types/Primitive";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBook = defineStore("books", () => {
    const { createRequest } = useFetch();
    const state = ref<Array<BookEntity>>([])

    const findBookByUuid = async (
        uuid: string
    ) => {
        try {
            const response = await createRequest<BookEntity>(`commerce/books/${uuid}`, 'GET');
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

    const createBook = async (data: Record<string, string | number>) => {
        try {
            const response = await createRequest<BookEntity>('commerce/books', 'POST', data);
            state.value = [...state.value, response.data]
        } catch (error) {
            console.log(error)
        }
    }

    const updateBookByUuid = async (
        uuid: string,
        data: Record<string, Primitive>
    ) => {
        try {
            const response = await createRequest<BookEntity>(`commerce/books/${uuid}`, 'PUT', data);
            state.value = state.value.map((book) => {
                if (book.uuid === response.data.uuid) {
                    book.designation = response.data.designation,
                    book.description = response.data.description,
                    book.active = response.data.active
                    book.visible = response.data.visible
                }
                return book
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
        updateBookByUuid,
        updateState: (books: BookEntity[]) => state.value = books
    }
})